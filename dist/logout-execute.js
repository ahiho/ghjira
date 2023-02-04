'use strict';

var fs = require('fs');
var path = require('./path.js');

function execute() {
    fs.unlinkSync(path.cliConfigPath);
    fs.unlinkSync(path.cliCredentialsPath);
    fs.unlinkSync(path.configPath);
}

module.exports = execute;
//# sourceMappingURL=logout-execute.js.map
