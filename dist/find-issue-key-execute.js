'use strict';

var lodash = require('./lodash-fa14b848.js');
var jira = require('./jira.js');
var getGithubEvent = require('./get-github-event.js');
require('./_commonjsHelpers-9f9f50a8.js');
require('url');
require('./fetch.js');
require('stream');
require('http');
require('punycode');
require('https');
require('zlib');
require('fs');

const issueIdRegEx = /([a-zA-Z0-9]+-[0-9]+)/g;
const preprocessString = (str, githubEvent) => {
    lodash._.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const tmpl = lodash._.template(str);
    return tmpl({ event: githubEvent });
};
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
    for (const issueKey of match) {
        const response = await jiraInstance.getIssue(issueKey);
        if (response) {
            return { issue: response.body.key };
        }
    }
    return null;
}

module.exports = execute;
//# sourceMappingURL=find-issue-key-execute.js.map
