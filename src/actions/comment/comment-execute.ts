import _ from 'lodash'

import Jira from '../../services/jira'
import getGithubEvent from '../../utils/get-github-event'
import mdToAdf from '../../utils/md-to-adf'

async function execute(config, rawComment: string) {
  const githubEvent = getGithubEvent()

  const jiraInstance = new Jira({
    baseUrl: config.baseUrl,
    email: config.email,
    token: config.token
  })

  const issueKey: string = config.issue

  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
  const compiled = _.template(rawComment)
  const interpolatedComment = compiled({event: githubEvent})

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
