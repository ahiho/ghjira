'use strict';

var fs = require('fs');
var core = require('./core-d426bd55.js');
var index = require('./index-7e527b11.js');
var path = require('./path.js');
var action = require('./action.js');
var transitionExecute = require('./transition-execute.js');
require('./_commonjsHelpers-9f9f50a8.js');
require('os');
require('path');
require('http');
require('https');
require('net');
require('tls');
require('events');
require('assert');
require('util');
require('./jira.js');
require('url');
require('./fetch.js');
require('node:http');
require('node:https');
require('node:zlib');
require('node:stream');
require('node:buffer');
require('node:util');
require('./index-5862fa85.js');
require('node:url');
require('node:net');
require('node:fs');
require('node:path');

const config = index.YAML.parse(fs.readFileSync(path.configPath, 'utf8'));
async function run() {
    try {
        const transitionName = action.getRequiredInput('transition');
        const response = await transitionExecute(config, transitionName);
        console.log(`Changed ${config.issue} status to: ${response.body.fields.status.name} .`);
        return;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        core.coreExports.setFailed(message);
        console.log(error);
        return;
    }
}
void run();
//# sourceMappingURL=transition-main.js.map
