let express = require('express');
let server = express(); // todo: das mal ablösen durch Nutzung des http / https Moduls
let bodyParser = require('body-parser');
server.use(bodyParser.json());       // to support JSON-encoded bodies

let repository = {};
let openHttpChannels = {};

module.exports = {
    publishServices: publishServices,
    publishFiles: publishFiles
};

/**
 * Stellt Services unter dem angegebenen URL-Pfad zur Verfügung
 * Posts mit JSON-Reuests auf dieser URL werden ausgeführt und das Ergebnis via HTTP-Body zurück geliefert.
 * @param {string} urlPath URL (ohne Host) unter der die Services verfügbar gemacht werden sollen
 * @param {Array of string} formats erlaubte Formate der Requests ['json', 'xml']
 * @param {Object} config Konfigurationswerte ...
 */
function publishServices(urlPath, formats, config) {
    config = config || {};
    config.port = config.port || 8080;
    if (!openHttpChannels[config.port]) {
        server.listen(config.port);
        openHttpChannels[config.port] = true;
    }
    server.post(urlPath, function(req, res) {
        application.execute(req.body, function(err, result) {
            if (err) {
                res.json(application.handleException(err));
            }
            else {
                res.json(result);
            }
        });
    });

    // sends
    server.get('/repository', function(req, res) {
        return res.json(application.getRepository())
    });

    /*
    server.get(urlPath, function(req, res) {
        application.execute(req.body, function(err, result) {
            if (err) {
                res.json(application.handleException(err));
            }
            else {
                res.json(result);
            }
        });
    });
    */


}

/**
 * Stellt die Dateien im Verzeichnis dir unter dem URL-Pfad urlPath zur Verfügung
 * @param {string} dir Verzeichnis
 * @param {string} urlPath urlPath URL (ohne Host) unterhalb dessen die Dateien von 'dir' per HTTP-GET abrufbar sein sollen
 */
function publishFiles(dir, urlPath) {
    if (urlPath) {
        server.use(urlPath, express.static(dir));
    } else {
        server.use(express.static(dir));
    }
}