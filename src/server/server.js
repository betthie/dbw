/**
 * Created by Willi on 21.06.2017.
 */


global.root = __dirname;
global.application = require('./.lib/core.js');
application.addServices(root + '/services');
application.http.publishServices('/', ['json', 'xml']);
application.http.publishFiles(root + '/content');
application.onException(function(err) {
    if (err.type === 'exception') {
        console.log(err);
        return {
            messages: [{
                type: 'exception',
                code: 0,
                text: 'An internal error has occured. Please contact your system administrator'
            }]
        };
    }
    else if (err.type === 'error') {
        return {
            messages: [{
                type: 'error',
                code: err.code, // better here will some translation be implemented (server-erros-Codes zu APP-ErrorCodes)
                text: err.code
            }]
        }
    }
});
