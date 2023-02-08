import {AxiosInstance, AxiosResponse} from 'axios'

import {JiraConfig} from '../types'
import axiosClient from '../utils/axios-client'

export default class Jira {
  private readonly baseUrl: string
  private readonly token: string
  private readonly email: string

  constructor({baseUrl, token, email}: JiraConfig) {
    this.baseUrl = baseUrl
    this.token = token
    this.email = email
  }

  private jiraClient(): AxiosInstance {
    const token = Buffer.from(`${this.email}:${this.token}`).toString('base64')

    return axiosClient(this.baseUrl, token)
  }

  async getMyself(): Promise<AxiosResponse<any, any>> {
    return this.jiraClient().get('/rest/api/3/myself')
  }

  async getIssues(issueId: string): Promise<AxiosResponse<any, any>> {
    return this.jiraClient().get(`/rest/api/3/issue/${issueId}`)
  }

  async addComment(
    issueKey: string,
    data: any
  ): Promise<AxiosResponse<any, any>> {
    return this.jiraClient().post(`/rest/api/3/issue/${issueKey}/comment`, data)
  }

  async getIssueTransitions(
    issueKey: string
  ): Promise<AxiosResponse<any, any>> {
    return this.jiraClient().get(`/rest/api/3/issue/${issueKey}/transitions`)
  }

  async transitionIssue(
    issueKey: string,
    data: any
  ): Promise<AxiosResponse<any, any>> {
    return this.jiraClient().post(
      `/rest/api/3/issue/${issueKey}/transitions`,
      data
    )
  }
}
