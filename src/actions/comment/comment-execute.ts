import Jira from '../../services/jira'
import getGithubEvent from '../../utils/get-github-event'
import mdToAdf from '../../utils/md-to-adf'
import preprocessString from '../../utils/preprocess-string'

async function execute(config, rawComment: string) {
  const githubEvent = getGithubEvent()

  const jiraInstance = new Jira({
    baseUrl: config.baseUrl,
    email: config.email,
    token: config.token
  })

  const configIssueKeys: string = config.issue

  const issueKeys = configIssueKeys.split(',')

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
