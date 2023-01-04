import {defaultSchema} from '@atlaskit/adf-schema/schema-default'
import {JSONTransformer} from '@atlaskit/editor-json-transformer'
import {MarkdownTransformer} from '@atlaskit/editor-markdown-transformer'

const mdToAdf = (md: string) => {
  ;(defaultSchema.nodes.mediaSingle as any).attrs.layout.default = 'align-start'

  const jsonTransformer = new JSONTransformer()
  const markdownTransformer = new MarkdownTransformer(defaultSchema)

  const adfDocument = jsonTransformer.encode(markdownTransformer.parse(md))

  return adfDocument
}

export default mdToAdf
