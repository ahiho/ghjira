'use strict';

var lodash = require('./lodash-fa14b848.js');
var jira = require('./jira.js');
var getGithubEvent = require('./get-github-event.js');
var mdToAdf = require('./md-to-adf.js');
require('./_commonjsHelpers-9f9f50a8.js');
require('url');
require('./fetch.js');
require('stream');
require('http');
require('punycode');
require('https');
require('zlib');
require('fs');

async function execute(config, rawComment) {
    const githubEvent = getGithubEvent();
    const jiraInstance = new jira({
        baseUrl: config.baseUrl,
        email: config.email,
        token: config.token
    });
    const issueKey = config.issue;
    lodash._.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    const compiled = lodash._.template(rawComment);
    const interpolatedComment = compiled({ event: githubEvent });
    const comment = mdToAdf(interpolatedComment);
    await jiraInstance.addComment(issueKey, JSON.stringify({
        body: comment
    }));
    console.log(`Comment has been added to ${issueKey}: ${interpolatedComment}`);
}

module.exports = execute;
//# sourceMappingURL=comment-execute.js.map
