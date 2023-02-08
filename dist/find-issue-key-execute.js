'use strict';

var jira = require('./jira.js');
var getGithubEvent = require('./get-github-event.js');
var preprocessString = require('./preprocess-string.js');
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
require('./_commonjsHelpers-9f9f50a8.js');

const issueIdRegEx = /([a-zA-Z0-9]+-[0-9]+)/g;
async function execute(config, inputString) {
    const githubEvent = getGithubEvent();
    const jiraInstance = new jira({
        baseUrl: config.baseUrl,
        email: config.email,
        token: config.token
    });
    const extractString = preprocessString(inputString, githubEvent);
    const match = extractString.match(issueIdRegEx);
    if (!match) {
        console.log(`String "${extractString}" does not contain issueKeys`);
        return;
    }
    const issues = [];
    for (const issueKey of match) {
        const response = await jiraInstance.getIssues(issueKey);
        if (response.status === 200) {
            issues.push(response.data.key);
        }
    }
    return issues.length > 0 ? [...new Set(issues)].join(', ') : null;
}

module.exports = execute;
//# sourceMappingURL=find-issue-key-execute.js.map
