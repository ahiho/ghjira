import {URL} from 'url'

import {RequestInit} from 'node-fetch'

import apiHandler from '../utils/fetch'

export default class Jira {
  private readonly baseUrl: string
  private readonly token: string
  private readonly email: string

  constructor({
    baseUrl,
    token,
    email
  }: {
    baseUrl: string
    token: string
    email: string
  }) {
    this.baseUrl = baseUrl
    this.token = token
    this.email = email
  }

  private jiraClient(
    url: string,
    {method, body, headers = {}}: RequestInit
  ): any {
    const requestUrl = new URL(url, this.baseUrl)

    if (method === undefined) {
      method = 'GET'
    }

    if (headers['Accept'] === undefined) {
      headers['Accept'] = 'application/json'
    }

    if (headers['Content-Type'] === undefined) {
      headers['Content-Type'] = 'application/json'
    }

    if (headers['Authorization'] === undefined) {
      headers['Authorization'] = `Basic ${Buffer.from(
        `${this.email}:${this.token}`
      ).toString('base64')}`
    }

    // if (body && headers['Content-Type'] === 'application/json') {
    //   body = JSON.stringify(body)
    // }

    return apiHandler(requestUrl.toString(), {
      method,
      headers,
      body
    })
  }

  async getMyself(): Promise<any> {
    return this.jiraClient('/rest/api/3/myself', {
      method: 'GET'
    })
  }

  async getIssue(issueId: string): Promise<any> {
    return this.jiraClient(`/rest/api/3/issue/${issueId}`, {
      method: 'GET'
    })
  }

  async addComment(issueKey: string, data: any): Promise<any> {
    return this.jiraClient(`/rest/api/3/issue/${issueKey}/comment`, {
      method: 'POST',
      body: data
    })
  }

  async getIssueTransitions(issueKey: string) {
    return this.jiraClient(`/rest/api/3/issue/${issueKey}/transitions`, {
      method: 'GET'
    })
  }

  async transitionIssue(issueKey: string, data: any) {
    return this.jiraClient(`/rest/api/3/issue/${issueKey}/transitions`, {
      method: 'POST',
      body: data
    })
  }
}
