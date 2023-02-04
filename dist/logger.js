'use strict';

var core = require('./core-d426bd55.js');
require('./_commonjsHelpers-9f9f50a8.js');
require('os');
require('fs');
require('path');
require('http');
require('https');
require('net');
require('tls');
require('events');
require('assert');
require('util');

function getActionsLogger() {
    return core.core;
}
function getRunnerLogger(debugMode) {
    return {
        debug: debugMode ? console.debug : () => undefined,
        info: console.info,
        warning: console.warn,
        error: console.error,
        isDebug: () => debugMode,
        startGroup: () => undefined,
        endGroup: () => undefined
    };
}

exports.getActionsLogger = getActionsLogger;
exports.getRunnerLogger = getRunnerLogger;
//# sourceMappingURL=logger.js.map
