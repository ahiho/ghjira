'use strict';

/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */

function isUndefined(value) {
  return value === undefined;
}

var isUndefined_1 = isUndefined;

const getIssueKeys = (config) => {
    const configIssueKeys = config.issue;
    if (isUndefined_1(configIssueKeys)) {
        throw new Error('Get issue key failed.');
    }
    const issueKeys = configIssueKeys.split(',');
    return issueKeys;
};

exports.getIssueKeys = getIssueKeys;
exports.isUndefined_1 = isUndefined_1;
//# sourceMappingURL=get-issue-keys-492ae078.js.map
