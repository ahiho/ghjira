import _ from 'lodash'

import Jira from '../../services/jira'
import getGithubEvent from '../../utils/get-github-event'

const issueIdRegEx = /([a-zA-Z0-9]+-[0-9]+)/g

const preprocessString = (str: string, githubEvent) => {
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
  const tmpl = _.template(str)

  return tmpl({event: githubEvent})
}

async function execute(config, inputString: string) {
  const githubEvent = getGithubEvent()

  const jiraInstance = new Jira({
    baseUrl: config.baseUrl,
    email: config.email,
    token: config.token
  })

  const extractString = preprocessString(inputString, githubEvent)
  const match = extractString.match(issueIdRegEx)

  if (!match) {
    console.log(`String "${extractString}" does not contain issueKeys`)

    return
  }

  for (const issueKey of match) {
    const response = await jiraInstance.getIssue(issueKey)

    if (response) {
      return {issue: response.body.key}
    }
  }

  return null
}

export default execute
