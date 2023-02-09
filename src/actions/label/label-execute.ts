import Jira from '../../services/jira'
import {JiraConfig} from '../../types'
import getIssueKeys from '../../utils/get-issue-keys'

async function execute(
  config: JiraConfig,
  addLabels: string[],
  removeLabels: string[]
) {
  const jiraInstance = new Jira(config)
  const issueKeys = getIssueKeys(config)

  await Promise.all(
    issueKeys.map(issueKey =>
      jiraInstance.editIssue(issueKey, {
        update: {
          labels: [
            ...addLabels.map(label => ({add: label.trim()})),
            ...removeLabels.map(label => ({remove: label.trim()}))
          ]
        }
      })
    )
  )
}

export default execute
