'use strict';

var fs = require('fs');
var path$1 = require('path');
var core = require('./core-bbeea745.js');
var index = require('./index-7e527b11.js');
var path = require('./path.js');
var action = require('./action.js');
var loginExecute = require('./login-execute.js');
require('./_commonjsHelpers-9f9f50a8.js');
require('os');
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
require('stream');
require('punycode');
require('zlib');

async function run() {
    try {
        const config = {
            baseUrl: action.getRequiredEnvParam('JIRA_BASE_URL'),
            email: action.getRequiredEnvParam('JIRA_USER_EMAIL'),
            token: action.getRequiredEnvParam('JIRA_API_TOKEN')
        };
        const response = await loginExecute(config);
        if (response) {
            if (!fs.existsSync(path.configPath)) {
                fs.mkdirSync(path$1.dirname(path.configPath), { recursive: true });
            }
            fs.writeFileSync(path.configPath, index.YAML.stringify(config));
            if (!fs.existsSync(path.cliConfigPath)) {
                fs.mkdirSync(path$1.dirname(path.cliConfigPath), { recursive: true });
            }
            fs.writeFileSync(path.cliConfigPath, index.YAML.stringify({
                endpoint: config.baseUrl,
                login: config.email
            }));
            fs.writeFileSync(path.cliCredentialsPath, `JIRA_API_TOKEN=${config.token}`);
            return;
        }
        console.log('Failed to login.');
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
//# sourceMappingURL=login-main.js.map
