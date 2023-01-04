'use strict';

var jira = require('./jira.js');
require('url');
require('./fetch.js');
require('stream');
require('http');
require('punycode');
require('https');
require('zlib');

async function execute(config) {
    const jiraInstance = new jira(config);
    const myself = await jiraInstance.getMyself();
    console.log(`Logged in as: ${myself}`);
    return myself;
}

module.exports = execute;
//# sourceMappingURL=login-execute.js.map
