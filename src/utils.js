export function converToObject(str) {
  try {
    return Function(`"use strict"; return ({ ${str.trim()} }) `)()
  } catch (error) {
    throw new Error('Variables is invalid. Check the commas and punctuations')
  }
}
export function convertToMarkdown(vars, md, delims) {
  delims = delims || ['---vars', '---']

  try {
    const variables = JSON.stringify(vars, null, 2)
      .replace(/^{/, delims[0])
      .replace(/}$/, delims[1])

    return `${variables}\n${md.trim()}`
  } catch (error) {
    throw new Error('The variables must be a valid javascript object')
  }
  // Convert the variables into markedVars variables
}
