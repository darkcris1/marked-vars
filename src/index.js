import marked from 'marked'
import { converToObject, convertToMarkdown } from './utils'

function markedVars(value, options) {
  if (!value) return

  options = { delims: ['---vars', '---'], ...options }
  const { delims } = options

  const matcherForVars = new RegExp(`^${delims[0]}(.*?)${delims[1]}`, 's')

  // Match if there is a variable instance
  const vars = value.trim().match(matcherForVars)

  if (!vars) return { vars: {}, html: marked(value.trim(), options) }

  const mdVars = converToObject(vars[1])
  const mdWithoudVars = value.replace(vars[0], '').trim()

  // replace the variables into variables value
  const compiledMd = Object.entries(mdVars).reduce((acc, [key, value]) => {
    return acc.replace(RegExp(`@\\(${key}\\)`, 'g'), value)
  }, mdWithoudVars)

  return {
    vars: mdVars,
    html: marked(compiledMd, options),
  }
}

markedVars.convertToMarkdown = convertToMarkdown
markedVars.options = marked.options
markedVars.Renderer = marked.Renderer
markedVars.setOptions = marked.setOptions
markedVars.getDefaults = marked.getDefaults
markedVars.Tokenizer = marked.Tokenizer
markedVars.lexer = marked.lexer
markedVars.parse = marked.parse
markedVars.use = marked.use
markedVars.TextRenderer = marked.TextRenderer
markedVars.Slugger = marked.Slugger

export default markedVars
