import Jira from '../../services/jira'

async function execute(config, transitionName) {
  const jiraInstance = new Jira({
    baseUrl: config.baseUrl,
    email: config.email,
    token: config.token
  })

  const issueKey: string = config.issue

  const response = await jiraInstance.getIssueTransitions(issueKey)

  const {transitions} = response.body

  const transitionToApply = transitions.find(
    t => transitionName.toLowerCase() === t.name.toLowerCase()
  )

  if (!transitionToApply) {
    console.log('Please specify transition name or transition id.')
    console.log('Possible transitions:')

    for (const t of transitions) {
      console.log(`'${t.to.name}'`)
    }

    return
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

  return transitionedIssue
}

export default execute
