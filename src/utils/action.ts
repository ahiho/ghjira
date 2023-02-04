import * as core from '@actions/core'

export const getRequiredEnvParam = (paramName: string): string => {
  const value = process.env[paramName]

  if (value === undefined || value.length === 0) {
    throw new Error(`${paramName} environment variable must be set`)
  }

  return value
}

export const getRequiredInput = (name: string): string => {
  return core.getInput(name, {required: true})
}

export const getOptionalInput = (name: string): string | undefined => {
  const value = core.getInput(name)
  return value.length > 0 ? value : undefined
}
