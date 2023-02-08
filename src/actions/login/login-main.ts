import fs from 'fs'
import path from 'path'

import * as core from '@actions/core'
import YAML from 'yaml'

import {
  cliConfigPath,
  cliCredentialsPath,
  configPath
} from '../../constants/path'
import {JiraConfig} from '../../types'
import {getRequiredEnvParam} from '../../utils/action'

import execute from './login-execute'

async function run(): Promise<void> {
  try {
    const config: JiraConfig = {
      baseUrl: getRequiredEnvParam('JIRA_BASE_URL'),
      email: getRequiredEnvParam('JIRA_USER_EMAIL'),
      token: getRequiredEnvParam('JIRA_API_TOKEN')
    }

    const response = await execute(config)

    if (response.status !== 200) {
      console.log('Failed to login.')

      return
    }

    console.log(`Logged in as: ${response.data.displayName}`)

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
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    core.setFailed(message)
    console.log(error)
    return
  }
}

void run()
