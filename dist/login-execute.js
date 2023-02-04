'use strict';

var jira = require('./jira.js');
require('url');
require('./fetch.js');
require('node:http');
require('node:https');
require('node:zlib');
require('node:stream');
require('node:buffer');
require('node:util');
require('./index-5862fa85.js');
require('./_commonjsHelpers-9f9f50a8.js');
require('node:url');
require('node:net');
require('node:fs');
require('node:path');

async function execute(config) {
    const jiraInstance = new jira(config);
    const myself = await jiraInstance.getMyself();
    console.log(`Logged in as: ${myself}`);
    return myself;
}

module.exports = execute;
//# sourceMappingURL=login-execute.js.map
