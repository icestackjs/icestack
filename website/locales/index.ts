import { createI18n } from 'next-international'

export const { useI18n, useScopedI18n, I18nProvider, getLocaleProps } = createI18n({
  'en-US': () => import('./en-US'),
  'zh-CN': () => import('./zh-CN')
})
