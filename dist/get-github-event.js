'use strict';

var fs = require('fs');

const getGithubEvent = () => {
    const githubEventJSON = fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf-8');
    const githubEvent = JSON.parse(githubEventJSON);
    return githubEvent;
};

module.exports = getGithubEvent;
//# sourceMappingURL=get-github-event.js.map
