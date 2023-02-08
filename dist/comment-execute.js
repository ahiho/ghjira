'use strict';

var jira = require('./jira.js');
var getGithubEvent = require('./get-github-event.js');
var mdToAdf = require('./md-to-adf.js');
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
require('punycode');

async function execute(config, rawComment) {
    const githubEvent = getGithubEvent();
    const jiraInstance = new jira({
        baseUrl: config.baseUrl,
        email: config.email,
        token: config.token
    });
    const issueKey = config.issue;
    const interpolatedComment = preprocessString(rawComment, githubEvent);
    const comment = mdToAdf(interpolatedComment);
    await jiraInstance.addComment(issueKey, JSON.stringify({
        body: comment
    }));
    console.log(`Comment has been added to ${issueKey}: ${interpolatedComment}`);
}

module.exports = execute;
//# sourceMappingURL=comment-execute.js.map
