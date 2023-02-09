'use strict';

var fs = require('fs');
var core = require('./core-bf449f77.js');
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
require('./axios-client.js');
require('stream');
require('url');
require('tty');
require('zlib');
require('./get-issue-keys-492ae078.js');

const config = index.YAML.parse(fs.readFileSync(path.configPath, 'utf8'));
async function run() {
    try {
        const transitionName = action.getRequiredInput('transition');
        const transitionedIssues = await transitionExecute(config, transitionName);
        transitionedIssues.map(transitionedIssue => {
            console.log(`Changed ${transitionedIssue.issueKey} status to: ${transitionedIssue.transitionName} .`);
        });
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
