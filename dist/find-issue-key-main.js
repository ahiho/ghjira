'use strict';

var fs = require('fs');
var core = require('./core-bf449f77.js');
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
require('./jira.js');
require('./axios-client.js');
require('stream');
require('url');
require('tty');
require('zlib');
require('./get-github-event.js');
require('./preprocess-string.js');

const config = index.YAML.parse(fs.readFileSync(path.configPath, 'utf8'));
async function run() {
    try {
        const inputString = action.getRequiredInput('string');
        const issueKeys = await findIssueKeyExecute(config, inputString);
        if (issueKeys) {
            console.log(`Detected issueKey: ${issueKeys}`);
            console.log(`Saving ${issueKeys} to ${path.cliConfigPath}`);
            console.log(`Saving ${issueKeys} to ${path.configPath}`);
            const extendedConfig = Object.assign({}, config, {
                issue: issueKeys
            });
            fs.writeFileSync(path.configPath, index.YAML.stringify(extendedConfig));
            return fs.appendFileSync(path.cliConfigPath, index.YAML.stringify(issueKeys));
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
