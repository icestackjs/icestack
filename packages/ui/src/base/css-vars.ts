export const shareVars = {
  'rounded-box': '1rem',
  'rounded-btn': '0.5rem',
  'rounded-badge': '1.9rem',
  'animation-btn': '0.25s',
  'animation-input': '0.2s',
  'btn-text-case': 'uppercase',
  'btn-focus-scale': '0.95',
  'border-btn': '1px',
  'tab-border': '1px',
  'tab-radius': '0.5rem'
}

export function addVarPrefix(entries: [string, string][]): [string, string][] {
  return entries.map(([key, value]) => {
    return ['--' + key, value]
  })
}

export const defaultColorVars = {
  // primary
  // blue-6
  primary: '#1677ff',
  // blue-5
  'primary-focus': '#4096ff',
  // white
  'primary-content': '#ffffff',
  // success

  // green-6
  success: '#52c41a',
  // green-5
  'success-focus': '#73d13d',
  'success-content': '#ffffff',
  // warning
  // gold-6
  warning: '#faad14',
  // gold-5
  'warning-focus': '#ffc53d',
  'warning-content': '#ffffff',
  // error
  // red-6
  error: '#f5222d',
  // red-5
  'error-focus': '#ff4d4f',
  'error-content': '#ffffff',
  // info
  // blue-6
  info: '#1677ff',
  // blue-5
  'info-focus': '#4096ff',
  'info-content': '#ffffff',
  // neutral
  neutral: '#bfbfbf',
  'neutral-focus': '#d9d9d9',
  'neutral-content': '#ffffff',
  // base
  'base-100': '#ffffff',
  'base-200': 'rgb(242, 242, 242)',
  'base-300': 'rgb(229, 230, 230)',
  'base-content': 'rgb(31, 41, 55)'
}

export const defaultDarkColorVars: Record<keyof typeof defaultColorVars, string> = {
  // primary
  // blue-6
  primary: '#1668dc',
  // blue-5
  'primary-focus': '#1554ad',
  'primary-content': '#000000',
  // success

  // green-6
  success: '#49aa19',
  // green-5
  'success-focus': '#3c8618',
  'success-content': '#000000',
  // warning
  // gold-6
  warning: '#d89614',
  // gold-5
  'warning-focus': '#aa7714',
  'warning-content': '#000000',
  // error
  // red-6
  error: '#d32029',
  // red-5
  'error-focus': '#a61d24',
  'error-content': '#000000',
  // info
  // blue-6
  info: '#1668dc',
  // blue-5
  'info-focus': '#1554ad',
  'info-content': '#000000',
  // neutral
  neutral: 'rgb(42, 50, 60)',
  'neutral-focus': 'rgb(36, 43, 51)',
  'neutral-content': 'rgb(166, 173, 186)',
  // base
  'base-100': 'rgb(29, 35, 42)',
  'base-200': 'rgb(25, 30, 36)',
  'base-300': 'rgb(21, 25, 30)',
  'base-content': 'rgb(166, 173, 186)'
}

export const defaultVarsEntries = addVarPrefix(
  Object.entries({
    ...defaultColorVars,
    ...shareVars
    // disabled-text: #00000040,
    // default-border: #d9d9d9,
    // separator: #0505050f,
    // layout-background: #f5f5f5,
    // heading-text: #171717,
    // text-100: #171717,
    // text-200: #404040,
  })
)

export const defaultDarkVarsEntries = addVarPrefix(
  Object.entries({
    ...defaultDarkColorVars,
    ...shareVars
  })
)

// function isValidColor(str: string) {
//   const color = new TinyColor(str)
//   return color.isValid
// }

// for (const [varName, value] of Object.entries(defaultVarsMap)) {
//   sassValueMap.set(
//     new sass.SassString(varName, {
//       quotes: false
//     }),
//     new sass.SassString(value, {
//       quotes: false
//     })
//   )
// }
