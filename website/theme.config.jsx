export default {
  logo: <span>IceStack</span>,
  project: {
    link: 'https://github.com/sonofmagic/icestack'
  },
  docsRepositoryBase: 'https://github.com/sonofmagic/icestack/tree/main/website',
  useNextSeoProps() {
    return {
      titleTemplate: '%s | sonofmagic'
    }
  },
  i18n: [
    { locale: 'en-US', text: 'English' },
    { locale: 'zh-CN', text: '简体中文' }
  ],
  footer: {
    text: (
      <span className="text-xs">
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/sonofmagic/icestack" target="_blank">
          IceStack
        </a>
        .
      </span>
    )
  }
  // footer: () => {
  //   return {
  //     text: () => {
  //       return <span>1111</span>
  //     }
  //   }
  // }
  // ... other theme options
}
// https://github.com/vercel/swr-site/blob/main/translations/text.js
