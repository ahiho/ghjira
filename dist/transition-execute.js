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

async function execute(config, transitionName) {
    const jiraInstance = new jira({
        baseUrl: config.baseUrl,
        email: config.email,
        token: config.token
    });
    const issueKey = config.issue;
    const response = await jiraInstance.getIssueTransitions(issueKey);
    const { transitions } = response.body;
    const transitionToApply = transitions.find(t => transitionName.toLowerCase() === t.name.toLowerCase());
    if (!transitionToApply) {
        console.log('Please specify transition name or transition id.');
        console.log('Possible transitions:');
        for (const t of transitions) {
            console.log(`'${t.to.name}'`);
        }
        return;
    }
    console.log(`Selected transition: ${transitionToApply.name}`);
    await jiraInstance.transitionIssue(issueKey, JSON.stringify({
        transition: {
            id: transitionToApply.id
        }
    }));
    const transitionedIssue = await jiraInstance.getIssue(issueKey);
    return transitionedIssue;
}

module.exports = execute;
//# sourceMappingURL=transition-execute.js.map
