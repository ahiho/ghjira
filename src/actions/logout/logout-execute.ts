import fs from 'fs'

import {
  cliConfigPath,
  cliCredentialsPath,
  configPath
} from '../../constants/path'

function execute() {
  fs.unlinkSync(cliConfigPath)
  fs.unlinkSync(cliCredentialsPath)
  fs.unlinkSync(configPath)
}

export default execute
