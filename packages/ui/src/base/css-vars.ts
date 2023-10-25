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
  'primary-hover': '#4096ff',
  // blue-7
  'primary-focus': '#0958d9',
  // white
  'primary-content': '#ffffff',
  // success

  // green-6
  success: '#52c41a',
  'success-hover': '#73d13d',
  'success-focus': '#389e0d',
  'success-content': '#ffffff',
  // warning
  // gold-6
  warning: '#faad14',
  // gold-5
  'warning-hover': '#ffc53d',
  'warning-focus': '#d48806',
  'warning-content': '#ffffff',
  // error
  // red-6
  error: '#f5222d',
  // red-5
  'error-hover': '#ff4d4f',
  'error-focus': '#cf1322',
  'error-content': '#ffffff',
  // info
  // blue-6
  info: '#1677ff',
  // blue-5
  'info-hover': '#4096ff',
  'info-focus': '#0958d9',
  'info-content': '#ffffff',
  // neutral
  neutral: '#bfbfbf',
  'neutral-hover': '#d9d9d9',
  'neutral-focus': '#8c8c8c',
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
  'primary-hover': '#1554ad',
  'primary-focus': '#3c89e8',
  'primary-content': '#000000',
  // success

  // green-6
  success: '#49aa19',
  // green-5
  'success-hover': '#3c8618',
  'success-focus': '#6abe39',
  'success-content': '#000000',
  // warning
  // gold-6
  warning: '#d89614',
  // gold-5
  'warning-hover': '#aa7714',
  'warning-focus': '#e8b339',
  'warning-content': '#000000',
  // error
  // red-6
  error: '#d32029',
  // red-5
  'error-hover': '#a61d24',
  'error-focus': '#e84749',
  'error-content': '#000000',
  // info
  // blue-6
  info: '#1668dc',
  // blue-5
  'info-hover': '#1554ad',
  'info-focus': '#3c89e8',
  'info-content': '#000000',
  // neutral
  neutral: '#bfbfbf',
  'neutral-hover': '#d9d9d9',
  'neutral-focus': '#8c8c8c',
  'neutral-content': '#ffffff',
  // neutral: 'rgb(42, 50, 60)',
  // 'neutral-focus': 'rgb(36, 43, 51)',
  // 'neutral-content': 'rgb(166, 173, 186)',
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
