import Jira from '../../services/jira'
import {JiraConfig} from '../../types'

async function execute(config: JiraConfig) {
  const jiraInstance = new Jira(config)

  const myself = await jiraInstance.getMyself()

  return myself
}

export default execute
