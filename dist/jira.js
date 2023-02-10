'use strict';

var axiosClient = require('./axios-client.js');
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

class Jira {
    baseUrl;
    token;
    email;
    constructor({ baseUrl, token, email }) {
        this.baseUrl = baseUrl;
        this.token = token;
        this.email = email;
    }
    jiraClient() {
        const token = Buffer.from(`${this.email}:${this.token}`).toString('base64');
        return axiosClient(this.baseUrl, token);
    }
    async getMyself() {
        return this.jiraClient().get('/rest/api/3/myself');
    }
    async getIssue(issueId) {
        return this.jiraClient().get(`/rest/api/3/issue/${issueId}`);
    }
    async addComment(issueKey, data) {
        return this.jiraClient().post(`/rest/api/3/issue/${issueKey}/comment`, data);
    }
    async getIssueTransitions(issueKey) {
        return this.jiraClient().get(`/rest/api/3/issue/${issueKey}/transitions`);
    }
    async transitionIssue(issueKey, data) {
        return this.jiraClient().post(`/rest/api/3/issue/${issueKey}/transitions`, data);
    }
    async getLabels() {
        return this.jiraClient().get(`/rest/api/3/label`);
    }
    async editIssue(issueKey, data) {
        return this.jiraClient().put(`/rest/api/3/issue/${issueKey}`, data);
    }
}

module.exports = Jira;
//# sourceMappingURL=jira.js.map
