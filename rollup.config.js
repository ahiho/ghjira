const fs = require('fs')
const path = require('path')

const typescript = require('@rollup/plugin-typescript')
const {nodeResolve} = require('@rollup/plugin-node-resolve')
const json = require('@rollup/plugin-json')
const commonjs = require('@rollup/plugin-commonjs')

const buildFiles = []

const listFile = (folderPath, extension) => {
  const files = fs.readdirSync(folderPath)

  files.forEach(file => {
    const newBase = path.join(folderPath, file)

    if (fs.statSync(path.join(folderPath, file)).isDirectory()) {
      listFile(newBase, extension)
    } else {
      if (path.extname(file).toLowerCase() === extension) {
        buildFiles.push(newBase)
      }
    }
  })
}

listFile('src', '.ts')

module.exports = [
  {
    input: buildFiles,
    output: {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      globals: {
        fs: 'fs',
        '@actions/core': 'core',
        lodash: '_',
        Url: 'url',
        'whatwg-url': 'whatwgUrl',
        'css-color-names': 'namedColors',
        'linkify-it': 'LinkifyIt',
        'lodash/isEqual': 'isEqual',
        'lodash/isUndefined': 'isUndefined',
        'markdown-it': 'markdownit'
      }
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      }),
      json(),
      nodeResolve(),
      commonjs()
    ]
  }
]
