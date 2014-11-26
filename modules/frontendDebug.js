var Hipchatter = require('hipchatter'),
    hipchatter = new Hipchatter('otW1xkz3nGIj7KJ583MvLFuKQCX7ZLLzTmg8fWlq');

module.exports = function(req, res) {
    var data = req.body,
        msg = getMessage(data);


    hipchatter.notify('Frontend Debug', {
        message: msg,
        color: getColor(data),
        token: '3BW9X4Wc9dTVUoK2kyw2OYFYqQZt2TmhAcHQTHKy',
        notify: (data.notify == 'true')
    }, function(err){
    });
};

var getMessage = function(data) {

    if(typeof data.msg == 'string') {
        var msg = '<i>' + data.msg + '</i>';
    } else {
        var msg = '<strong>file:</strong> <i>' + data.msg.filename + '</i><br />' +
                  '<strong>line:</strong> <i>' + data.msg.line + '</i><br />' +
                  '<i>' + data.msg.msg + '</i>';
    }

    var msg = '<strong>' + data.type + ': ' + data.filename + ':</strong><br />' + msg + '<br />';

    /**
     * check for client info
     */
    if(data.clientInfo) {
        msg +=  'OS: ' + data.clientInfo.os +' '+ data.clientInfo.osVersion + '</i><br />'+
            'Browser: <i>' + data.clientInfo.browser +' '+ data.clientInfo.browserVersion + '</i><br />' +
            'Mobile: <i>' + data.clientInfo.mobile + '</i><br />' +
            'Flash: <i>' + data.clientInfo.flashVersion + '</i><br />' +
            'Cookies: <i>' + data.clientInfo.cookies + '</i><br />' +
            'Screen Size: <i>' + data.clientInfo.screen + '</i>';
    }

    return msg;

};

var getColor = function(data) {
    var color = 'red';

    switch(data.type) {
        case 'log':
            color = 'green';
            break;
        case 'info':
            color = 'purple';
            break;
        case 'debug':
            color = 'gray';
            break;
        case 'warn':
            color = 'yellow';
            break;
        case 'error':
            color = 'red';
            break;
    }

    return color;
};