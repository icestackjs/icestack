// 'addVarPrefix($varName)': addVarPrefix,
// 'avp($varName)': (args: sass.Value[]) => {
//   const varName = args[0].assertString('varName')
//   return new sass.SassString('--' + trimStart(varName.toString(), '-'), {
//     quotes: false
//   })
// },
// "var($varName,$default:'')": (args: sass.Value[]) => {
//   const str = addVarPrefix(args)
//   const defaultValue = args[1].toString()

//   const result = defaultValue ? `var(${str.toString()},${defaultValue})` : `var(${str.toString()})`
//   return new sass.SassString(result, {
//     quotes: false
//   })
// },

// function addVarPrefix(args: sass.Value[]) {
//   const varName = args[0].assertString('varName')
//   return new sass.SassString(defaultVarPrefix + trimStart(varName.toString(), '-'), {
//     quotes: false
//   })
// }
