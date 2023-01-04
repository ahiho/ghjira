import fs from 'fs'
import path from 'path'

import * as core from '@actions/core'
import YAML from 'yaml'

import {
  cliConfigPath,
  cliCredentialsPath,
  configPath
} from '../../constants/path'
import {getRequiredEnvParam} from '../../utils/action'

import execute from './login-execute'

async function run(): Promise<void> {
  try {
    const config = {
      baseUrl: getRequiredEnvParam('JIRA_BASE_URL'),
      email: getRequiredEnvParam('JIRA_USER_EMAIL'),
      token: getRequiredEnvParam('JIRA_API_TOKEN')
    }

    const response = await execute(config)

    if (response) {
      if (!fs.existsSync(configPath)) {
        fs.mkdirSync(path.dirname(configPath), {recursive: true})
      }

      fs.writeFileSync(configPath, YAML.stringify(config))

      if (!fs.existsSync(cliConfigPath)) {
        fs.mkdirSync(path.dirname(cliConfigPath), {recursive: true})
      }

      fs.writeFileSync(
        cliConfigPath,
        YAML.stringify({
          endpoint: config.baseUrl,
          login: config.email
        })
      )

      fs.writeFileSync(cliCredentialsPath, `JIRA_API_TOKEN=${config.token}`)

      return
    }

    console.log('Failed to login.')
    return
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    core.setFailed(message)
    console.log(error)
    return
  }
}

void run()
