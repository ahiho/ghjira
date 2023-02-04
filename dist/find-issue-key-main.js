'use strict';

var fs = require('fs');
var core = require('./core-d426bd55.js');
var index = require('./index-7e527b11.js');
var path = require('./path.js');
var action = require('./action.js');
var findIssueKeyExecute = require('./find-issue-key-execute.js');
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
require('./lodash-fa14b848.js');
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
require('./get-github-event.js');

const config = index.YAML.parse(fs.readFileSync(path.configPath, 'utf8'));
async function run() {
    try {
        const inputString = action.getRequiredInput('string');
        const response = await findIssueKeyExecute(config, inputString);
        if (response) {
            console.log(`Detected issueKey: ${response.issue}`);
            console.log(`Saving ${response.issue} to ${path.cliConfigPath}`);
            console.log(`Saving ${response.issue} to ${path.configPath}`);
            const extendedConfig = Object.assign({}, config, {
                issue: response.issue
            });
            fs.writeFileSync(path.configPath, index.YAML.stringify(extendedConfig));
            return fs.appendFileSync(path.cliConfigPath, index.YAML.stringify(response.issue));
        }
        console.log('No issueKeys found.');
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
//# sourceMappingURL=find-issue-key-main.js.map
