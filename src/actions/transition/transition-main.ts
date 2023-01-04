import fs from 'fs'

import * as core from '@actions/core'
import YAML from 'yaml'

import {configPath} from '../../constants/path'
import {getRequiredInput} from '../../utils/action'

import execute from './transition-execute'

const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function run(): Promise<void> {
  try {
    const transitionName = getRequiredInput('transition')

    const response = await execute(config, transitionName)

    console.log(
      `Changed ${config.issue} status to: ${response.body.fields.status.name} .`
    )

    return
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    core.setFailed(message)
    console.log(error)
    return
  }
}

void run()
