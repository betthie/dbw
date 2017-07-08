let fs = require('fs');
let path = require('path');
let chokidar = require('chokidar');
let async = require('async');
let _ = require('lodash');

let repository = {};
let exceptionHandler = function (err) {
    console.log(err);
    return {};
};

module.exports = {
    addServices: addServices,
    execute: execute,
    getRepository: getRepository,
    onException: onException,
    handleException: handleException,
    http: require('./http.adapter.js')
};

/**
 * Verzeichnis 'dir' rekursiv nach Service-Implementierungen durchsuchen, diese dem Repository hinzufügen
 * und überwachen, so das Änderungen im Dateisystem (add, change, delete) sofort auch im Repository und damit
 * in der Anwendung gemacht werden.
 * @param {*} dir
 * @param {*} prefix
 */
function addServices(dir, prefix) {

    // Wird aufgerufen, wenn eine Service-Datei angelegt oder geändert wird
    function updateService (file) {
        let filename = path.basename(file);
        let fullPath = dir;
        if (prefix) {
            fullPath = path.join(prefix.replace('_', path.sep), dir);
        }
        let parts = path.dirname(path.relative(fullPath, file)).split(path.sep);
        let scope = repository;
        parts.forEach(function(subScope) {
            if (subScope !== '.') {
                if (!scope[subScope]) {
                    scope[subScope] = {};
                }
                scope = scope[subScope];
            }
        });
        // Lösche required modul
        delete require.cache[require.resolve(file)];
        let serviceName = path.basename(file, '.service.js').split('.')[0];
        if (Array.isArray(scope[serviceName])) {
            scope[serviceName].push(require(file));
        }
        else {
            scope[serviceName] = [ require(file) ];
        }
    }

    //  Wird aufgerufen, wenn eine Service-Datei gelöscht wird
    function deleteService (file) {
        delete require.cache[require.resolve(file)];
    }

    //  Überwachung starten
    //  add feuert auch, wenn die Datei schon existiert aber chokidar diese das erste mal findet
    chokidar.watch(path.join(dir, '**', '*.service.js'), {
        ignored: /[\/\\]\./, persistent: true, recursive: true
    })
        .on('add', updateService)
        .on('change', updateService)
        .on('unlink', deleteService);

}

/**
 * Führt einen oder mehrere Requests aus
 * @param {*} input
 * @param {*} callback
 */
function execute(input, callback) {
    if (Array.isArray(input)) {
        async.map(input, executeRequest, callback);
    } else {
        executeRequest(input, callback);
    }
}

/**
 * Führt einen Request aus
 * @param {*} req
 * @param {*} callback
 */
function executeRequest(req, callback) {
    console.log(req);
    let requestName = Object.keys(req)[0];
    console.log(requestName);
    /*
    console.log('requestname');
    console.log(requestName);
    let parts = requestName.split('_');
    console.log('parts');
    console.log(parts);
    let executors = repository;
    for (let i=0; i< parts.length; i++) {
        let scope = parts[i];
        executors = executors[scope];
        if (!executors) {
            callback({ type: 'error', code: 'REQUEST_UNKNOWN' });
            return;
        }
    }
    if (executors.length === 1) {
        executors[0].execute(req[requestName], callback);
    }
    else {
        for(i=0; i < executors.length; i++) {
            if (executors[i].canHandle(req)) {
                executors[i].execute(req[requestName], callback);
            }
        }
    }
    */
}

/**
 * Legt den callback für auftretende Exceptions fest
 * @param {*} callback
 */
function onException(callback) {
    exceptionHandler = callback;
}

/**
 * Ruft den registrierten (oder default) ExceptionHandler auf
 * @param {*} err
 */
function handleException(err) {
    return exceptionHandler(err);
}

function getRepository() {
    let data = {};
    for(let service in repository){
        data[service] = repository[service][0].httpMethod();
    }
    return data;
}