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

    const transitionedIssues = await execute(config, transitionName)

    transitionedIssues.map(transitionedIssue => {
      console.log(
        `Changed ${transitionedIssue.issueKey} status to: ${transitionedIssue.transitionName} .`
      )
    })

    return
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    core.setFailed(message)
    console.log(error)
    return
  }
}

void run()
