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

async function execute(config, transitionName) {
    const jiraInstance = new jira({
        baseUrl: config.baseUrl,
        email: config.email,
        token: config.token
    });
    const configIssueKeys = config.issue;
    const issueKeys = configIssueKeys.split(',');
    const transitionedIssues = [];
    for (const issueKey of issueKeys) {
        const response = await jiraInstance.getIssueTransitions(issueKey);
        if (response.status !== 200) {
            throw new Error('Get issue transitions failed.');
        }
        const { transitions } = response.data;
        const transitionToApply = transitions.find(t => transitionName.toLowerCase() === t.name.toLowerCase());
        if (!transitionToApply) {
            console.log('Please specify transition name or transition id.');
            console.log('Possible transitions:');
            for (const t of transitions) {
                console.log(`'${t.to.name}'`);
            }
            throw new Error('Transition not found.');
        }
        console.log(`Selected transition: ${transitionToApply.name}`);
        await jiraInstance.transitionIssue(issueKey, JSON.stringify({
            transition: {
                id: transitionToApply.id
            }
        }));
        const transitionedIssue = await jiraInstance.getIssues(issueKey);
        if (transitionedIssue.status !== 200) {
            throw new Error('Get issue failed.');
        }
        transitionedIssues.push({
            issueKey,
            transitionName: transitionedIssue.data.fields.status.name
        });
    }
    return transitionedIssues;
}

module.exports = execute;
//# sourceMappingURL=transition-execute.js.map
