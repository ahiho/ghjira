import * as core from '@actions/core'

import execute from './logout-execute'

function run(): void {
  try {
    execute()

    console.log('Logged out')

    return
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    core.setFailed(message)
    console.log(error)
    return
  }
}

run()
