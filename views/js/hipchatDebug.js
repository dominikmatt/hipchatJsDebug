var hipchatDebugger = function(options) {

    var settings = $.extend({
        track: {
            log: true,
            debug: true,
            info: true,
            warn: true,
            error: true
        },
        preventConsole: true,
        clientInfo: true,
        url: '/message',
        notify: true
    }, options),
        self = this;

    /**
     * init
     *
     * @type {function(this:hipchatDebugger)}
     */
    this.init = function() {
        this.preventConsole();
        this.trackError();
    }.bind(this);

    this.trackError = function() {
        $(window).error(function(event){
            var origEvent = event.originalEvent;

            var data = {
                filename: origEvent.filename,
                msg: origEvent.message,
                line: origEvent.lineno
            };

            this.track(data, 'error');

            return false;
        }.bind(this));
    }.bind(this);

    /**
     * preventConsole
     *
     * @type {function(this:hipchatDebugger)}
     */
    this.preventConsole = function() {
        if(settings.preventConsole) {
            window.console.log = this.console.log;
            window.console.debug = this.console.debug;
            window.console.info = this.console.info;
            window.console.warn = this.console.warn;
            window.console.error = this.console.error;
        }
    }.bind(this);

    /**
     * console
     *
     * @type {{log: log, debug: debug, info: info, warn: warn, error: error}}
     */
    this.console = {
        log: function(msg) {
            self.log(msg, 'log');
            return false;
        },

        debug: function(msg) {
            self.log(msg, 'debug');
            return false;
        },

        info: function(msg) {
            self.log(msg, 'info');
            return false;
        },

        warn: function(msg) {
            self.log(msg, 'warn');
            return false;
        },

        error: function(msg) {
            self.log(msg, 'error');
            return false;
        }
    };

    /**
     *
     * @type {function(this:hipchatDebugger)}
     */
    this.log = function(msg, logLevel) {
        this.track(msg, logLevel);
    }.bind(this);

    /**
     *
     * @param msg
     * @param logLevel
     */
    this.track = function(msg, logLevel) {

        if(settings.track && settings.track[logLevel]) {
            var data = {
                type: logLevel,
                msg: msg,
                filename: window.location.href,
                notify: settings.notify
            };

            if(settings.clientInfo && window.jscd) {
                data.clientInfo = window.jscd;
            }

            $.post( settings.url, data );
        }
    };

    this.init();

    return {};

};