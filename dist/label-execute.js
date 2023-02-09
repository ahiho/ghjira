'use strict';

var jira = require('./jira.js');
var getIssueKeys = require('./get-issue-keys-492ae078.js');
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

async function execute(config, addLabels, removeLabels) {
    const jiraInstance = new jira(config);
    const issueKeys = getIssueKeys.getIssueKeys(config);
    await Promise.all(issueKeys.map(issueKey => jiraInstance.editIssue(issueKey, {
        update: {
            labels: [
                ...addLabels.map(label => ({ add: label.trim() })),
                ...removeLabels.map(label => ({ remove: label.trim() }))
            ]
        }
    })));
}

module.exports = execute;
//# sourceMappingURL=label-execute.js.map
