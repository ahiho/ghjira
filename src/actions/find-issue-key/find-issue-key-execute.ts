import Jira from '../../services/jira'
import getGithubEvent from '../../utils/get-github-event'
import preprocessString from '../../utils/preprocess-string'

const issueIdRegEx = /([a-zA-Z0-9]+-[0-9]+)/g

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

  const issues: string[] = []

  for (const issueKey of match) {
    const response = await jiraInstance.getIssue(issueKey)

    if (response.status === 200) {
      issues.push(response.data.key as string)
    }
  }

  return issues.length > 0 ? [...new Set(issues)].join(', ') : null
}

export default execute
