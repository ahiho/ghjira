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

  const issueKey: string = config.issue

  const interpolatedComment = preprocessString(rawComment, githubEvent)

  const comment = mdToAdf(interpolatedComment)

  await jiraInstance.addComment(
    issueKey,
    JSON.stringify({
      body: comment
    })
  )

  console.log(`Comment has been added to ${issueKey}: ${interpolatedComment}`)
}

export default execute
