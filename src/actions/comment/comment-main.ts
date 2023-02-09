import fs from 'fs'

import * as core from '@actions/core'
import YAML from 'yaml'

import {configPath} from '../../constants/path'
import {JiraConfig} from '../../types'
import {getRequiredInput} from '../../utils/action'

import execute from './comment-execute'

const config: JiraConfig = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function run(): Promise<void> {
  try {
    const rawComment = getRequiredInput('comment')
    await execute(config, rawComment)

    return
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    core.setFailed(message)
    console.log(error)
    return
  }
}

void run()
