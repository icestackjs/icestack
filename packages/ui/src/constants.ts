export const defaultVarPrefix = '--ice-'

export const someExtends = {
  borderRadius: {
    box: `var(${defaultVarPrefix}rounded-box, 1rem)`,
    btn: `var(${defaultVarPrefix}rounded-btn, 0.5rem)`,
    badge: `var(${defaultVarPrefix}rounded-badge, 1.9rem)`
  },
  minHeight: {
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem'
  }
}
