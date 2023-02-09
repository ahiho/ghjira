import Jira from '../../services/jira'
import {JiraConfig} from '../../types'
import getGithubEvent from '../../utils/get-github-event'
import getIssueKeys from '../../utils/get-issue-keys'
import mdToAdf from '../../utils/md-to-adf'
import preprocessString from '../../utils/preprocess-string'

async function execute(config: JiraConfig, rawComment: string) {
  const githubEvent = getGithubEvent()

  const jiraInstance = new Jira({
    baseUrl: config.baseUrl,
    email: config.email,
    token: config.token
  })

  const issueKeys = getIssueKeys(config)

  const interpolatedComment = preprocessString(rawComment, githubEvent)

  const comment = mdToAdf(interpolatedComment)

  for (const issueKey of issueKeys) {
    await jiraInstance.addComment(
      issueKey,
      JSON.stringify({
        body: comment
      })
    )

    console.log(`Comment has been added to ${issueKey}: ${interpolatedComment}`)
  }
}

export default execute
