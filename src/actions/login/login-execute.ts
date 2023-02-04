import Jira from '../../services/jira'

async function execute(config) {
  const jiraInstance = new Jira(config)

  const myself = await jiraInstance.getMyself()

  console.log(`Logged in as: ${myself}`)

  return myself
}

export default execute
