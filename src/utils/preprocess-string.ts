import _ from 'lodash'

const preprocessString = (str: string, githubEvent) => {
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g
  const tmpl = _.template(str)

  return tmpl({event: githubEvent})
}

export default preprocessString
