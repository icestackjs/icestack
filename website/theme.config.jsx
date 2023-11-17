// eslint-disable-next-line import/no-anonymous-default-export
export default {
  logo: <span>@icestack/ui</span>,
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
      <span className="text-xs space-x-2">
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/sonofmagic/icestack" rel="nofollow" target="_blank">
          IceStack
        </a>
        <a rel="nofollow" target="_blank" href="http://beian.miit.gov.cn">
          苏ICP备19002675号-2
        </a>
        <a rel="noreferrer" target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch?code=32050602011962">
          苏公网安备32050602011962
        </a>
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
