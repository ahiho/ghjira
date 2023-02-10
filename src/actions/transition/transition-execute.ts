import Jira from '../../services/jira'
import {JiraConfig} from '../../types'
import getIssueKeys from '../../utils/get-issue-keys'

async function execute(config: JiraConfig, transitionName: string) {
  const jiraInstance = new Jira({
    baseUrl: config.baseUrl,
    email: config.email,
    token: config.token
  })

  const issueKeys = getIssueKeys(config)

  const transitionedIssues: Array<{issueKey: string; transitionName: string}> =
    []

  for (const issueKey of issueKeys) {
    const response = await jiraInstance.getIssueTransitions(issueKey)

    if (response.status !== 200) {
      throw new Error('Get issue transitions failed.')
    }

    const {transitions} = response.data

    const transitionToApply = transitions.find(
      t => transitionName.toLowerCase() === t.name.toLowerCase()
    )

    if (!transitionToApply) {
      console.log('Please specify transition name or transition id.')
      console.log('Possible transitions:')

      for (const t of transitions) {
        console.log(`'${t.to.name}'`)
      }

      throw new Error('Transition not found.')
    }

    console.log(`Selected transition: ${transitionToApply.name}`)

    await jiraInstance.transitionIssue(
      issueKey,
      JSON.stringify({
        transition: {
          id: transitionToApply.id
        }
      })
    )

    const transitionedIssue = await jiraInstance.getIssue(issueKey)

    if (transitionedIssue.status !== 200) {
      throw new Error('Get issue failed.')
    }

    transitionedIssues.push({
      issueKey,
      transitionName: transitionedIssue.data.fields.status.name
    })
  }

  return transitionedIssues
}

export default execute
