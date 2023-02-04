import fs from 'fs'

const getGithubEvent = () => {
  const githubEventJSON = fs.readFileSync(
    process.env.GITHUB_EVENT_PATH as string,
    'utf-8'
  )

  const githubEvent = JSON.parse(githubEventJSON)

  return githubEvent
}

export default getGithubEvent
