'use strict';

var core = require('./core-bf449f77.js');
var logoutExecute = require('./logout-execute.js');
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
require('./path.js');

function run() {
    try {
        logoutExecute();
        console.log('Logged out');
        return;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        core.coreExports.setFailed(message);
        console.log(error);
        return;
    }
}
run();
//# sourceMappingURL=logout-main.js.map
