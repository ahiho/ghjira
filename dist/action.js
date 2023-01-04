'use strict';

var core = require('./core-bbeea745.js');
require('./_commonjsHelpers-9f9f50a8.js');
require('os');
require('fs');
require('path');
require('http');
require('https');
require('net');
require('tls');
require('events');
require('assert');
require('util');

const getRequiredEnvParam = (paramName) => {
    const value = process.env[paramName];
    if (value === undefined || value.length === 0) {
        throw new Error(`${paramName} environment variable must be set`);
    }
    return value;
};
const getRequiredInput = (name) => {
    return core.coreExports.getInput(name, { required: true });
};
const getOptionalInput = (name) => {
    const value = core.coreExports.getInput(name);
    return value.length > 0 ? value : undefined;
};

exports.getOptionalInput = getOptionalInput;
exports.getRequiredEnvParam = getRequiredEnvParam;
exports.getRequiredInput = getRequiredInput;
//# sourceMappingURL=action.js.map
