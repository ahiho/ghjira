'use strict';

var jira = require('./jira.js');
require('./axios-client.js');
require('util');
require('stream');
require('path');
require('http');
require('https');
require('url');
require('fs');
require('assert');
require('tty');
require('os');
require('zlib');
require('events');

async function execute(config) {
    const jiraInstance = new jira(config);
    const myself = await jiraInstance.getMyself();
    return myself;
}

module.exports = execute;
//# sourceMappingURL=login-execute.js.map
