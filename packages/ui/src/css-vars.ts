export const defaultVarsEntries = Object.entries({
  primary: '#1677ff',
  'primary-focus': '#4096ff',
  'primary-content': '#ffffff',
  'success-content': '#ffffff',
  success: '#52c41a',
  'success-focus': '#73d13d',

  'warning-content': '#ffffff',
  warning: '#faad14',
  'warning-focus': '#ffc53d',
  'error-content': '#ffffff',
  error: '#f5222d',
  'error-focus': '#ff4d4f',
  info: '#1677ff',
  'info-content': '#ffffff',
  'info-focus': '#4096ff',
  neutral: '#bfbfbf',
  'neutral-content': '#ffffff',
  'neutral-focus': '#d9d9d9',
  'base-100': '#ffffff',
  'base-200': 'rgb(242, 242, 242)',
  'base-300': 'rgb(229, 230, 230)',
  'base-content': 'rgb(31, 41, 55)',
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
  // disabled-text: #00000040,
  // default-border: #d9d9d9,
  // separator: #0505050f,
  // layout-background: #f5f5f5,
  // heading-text: #171717,
  // text-100: #171717,
  // text-200: #404040,
}).map(([key, value]) => {
  return ['--' + key, value]
}) as [string, string][]

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
