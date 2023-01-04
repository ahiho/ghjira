'use strict';

var Url = require('url');
var fetch = require('./fetch.js');
require('stream');
require('http');
require('punycode');
require('https');
require('zlib');

class Jira {
    baseUrl;
    token;
    email;
    constructor({ baseUrl, token, email }) {
        this.baseUrl = baseUrl;
        this.token = token;
        this.email = email;
    }
    jiraClient(url, { method, body, headers = {} }) {
        const requestUrl = new Url.URL(url, this.baseUrl);
        if (method === undefined) {
            method = 'GET';
        }
        if (headers['Accept'] === undefined) {
            headers['Accept'] = 'application/json';
        }
        if (headers['Content-Type'] === undefined) {
            headers['Content-Type'] = 'application/json';
        }
        if (headers['Authorization'] === undefined) {
            headers['Authorization'] = `Basic ${Buffer.from(`${this.email}:${this.token}`).toString('base64')}`;
        }
        // if (body && headers['Content-Type'] === 'application/json') {
        //   body = JSON.stringify(body)
        // }
        return fetch(requestUrl.toString(), {
            method,
            headers,
            body
        });
    }
    async getMyself() {
        return this.jiraClient('/rest/api/3/myself', {
            method: 'GET'
        });
    }
    async getIssue(issueId) {
        return this.jiraClient(`/rest/api/3/issue/${issueId}`, {
            method: 'GET'
        });
    }
    async addComment(issueKey, data) {
        return this.jiraClient(`/rest/api/3/issue/${issueKey}/comment`, {
            method: 'POST',
            body: data
        });
    }
    async getIssueTransitions(issueKey) {
        return this.jiraClient(`/rest/api/3/issue/${issueKey}/transitions`, {
            method: 'GET'
        });
    }
    async transitionIssue(issueKey, data) {
        return this.jiraClient(`/rest/api/3/issue/${issueKey}/transitions`, {
            method: 'POST',
            body: data
        });
    }
}

module.exports = Jira;
//# sourceMappingURL=jira.js.map
