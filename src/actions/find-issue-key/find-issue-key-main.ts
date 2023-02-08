import fs from 'fs'

import * as core from '@actions/core'
import YAML from 'yaml'

import {cliConfigPath, configPath} from '../../constants/path'
import {getRequiredInput} from '../../utils/action'

import execute from './find-issue-key-execute'

const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function run(): Promise<void> {
  try {
    const inputString = getRequiredInput('string')
    const issueKeys = await execute(config, inputString)

    if (issueKeys) {
      console.log(`Detected issueKey: ${issueKeys}`)
      console.log(`Saving ${issueKeys} to ${cliConfigPath}`)
      console.log(`Saving ${issueKeys} to ${configPath}`)

      const extendedConfig = Object.assign({}, config, {
        issue: issueKeys
      })

      fs.writeFileSync(configPath, YAML.stringify(extendedConfig))

      return fs.appendFileSync(cliConfigPath, YAML.stringify(issueKeys))
    }

    console.log('No issueKeys found.')
    return
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    core.setFailed(message)
    console.log(error)
    return
  }
}

void run()
