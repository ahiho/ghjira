import isUndefined from 'lodash/isUndefined'

import {JiraConfig} from '../types'

const getIssueKeys = (config: JiraConfig): string[] => {
  const configIssueKeys: string | undefined = config.issue

  if (isUndefined(configIssueKeys)) {
    throw new Error('Get issue key failed.')
  }

  const issueKeys = configIssueKeys.split(',')

  return issueKeys
}

export default getIssueKeys
