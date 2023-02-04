# GitHub Actions for Jira

The GitHub Actions for [Jira](https://www.atlassian.com/software/jira) to create and edit Jira issues.

- Automatically transition an issue to done when a pull request whose name contains the issue key is merged
- Automatically add a comment with markdown format to a Jira issue when a commit message contains the issue key

## Actions

- `Login` - Log in to the Jira API
- `Find issue key` - Search for an issue key in commit message, branch name, etc. This issue key is then saved and used by the next actions in the same workflow
- `Comment` - Add a comment to a Jira issue
- `Transition` - Transition a Jira issue
- `Logout` - Logout Jira

## Usage

An example workflow on `push`:

```
on:
  push

name: Test Github Actions for Jira

jobs:
  test-github-action-for-jira:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: |
          npm install

      - name: Login
        uses: ahiho/ghjira/actions/login@main
        env:
          JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
          JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
          JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}

      - name: Find Issue Key
        uses: ahiho/ghjira/actions/find-issue-key@main
        with:
          string: ${{ github.event.pull_request.head.ref }} ${{ github.event.pull_request.title }} ${{ github.event.head_commit.message }}

      - name: Comment To Jira Issue
        uses: ahiho/ghjira/actions/comment@main
        with:
          comment: |
            # Markdown header
            Description body. This is [a supported link](https://github.com/ahiho)
            This is an external image ![this is image alt](https://picsum.photos/200/300)
            ## Markdown header 2
            ### Markdown header 3

      - name: Transition Issue
        uses: ahiho/ghjira/actions/transition@main
        with:
          transition: "In progress"

      - name: Logout
        uses: ahiho/ghjira/actions/logout@main
```
