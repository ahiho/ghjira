import fs from 'fs'

import * as core from '@actions/core'
import isUndefined from 'lodash/isUndefined'
import YAML from 'yaml'

import {configPath} from '../../constants/path'
import {JiraConfig} from '../../types'
import {getOptionalInput} from '../../utils/action'

import execute from './label-execute'

const config: JiraConfig = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function run(): Promise<void> {
  try {
    let addLabels: string[] = []
    let removeLabels: string[] = []

    const inputAddLabel = getOptionalInput('add')
    const inputRemoveLabel = getOptionalInput('remove')

    if (!isUndefined(inputAddLabel)) {
      addLabels = inputAddLabel.split(',')
    }

    if (!isUndefined(inputRemoveLabel)) {
      removeLabels = inputRemoveLabel.split(',')
    }

    await execute(config, addLabels, removeLabels)

    return
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    core.setFailed(message)
    console.log(error)
    return
  }
}

void run()
