import { useRouter } from 'next/router'
import Image from 'next/image'
function Footer() {
  const router = useRouter()

  const isZh = router.locale === 'zh-CN'
  return (
    <div className="bg-base-300 py-8">
      <footer className="footer container mx-auto footer-center text-xs">
        <div className="flex flex-col space-x-2">
          <span className="flex space-x-2">
            MIT {new Date().getFullYear()}
            <a href="https://github.com/sonofmagic/icestack" rel="nofollow" target="_blank">
              © IceStack
            </a>
          </span>
          {isZh ? (
            <span className="flex space-x-2">
              <a rel="nofollow" target="_blank" href="http://beian.miit.gov.cn">
                苏ICP备19002675号-2
              </a>
              <a className="flex items-center" rel="noreferrer" target="_blank" href="https://beian.mps.gov.cn/#/query/webSearch?code=32050602011962">
                <Image className="mr-1" src={'/beian.png'} alt="beian" width={14} height={14}></Image>
                苏公网安备32050602011962
              </a>
            </span>
          ) : undefined}
        </div>
      </footer>
    </div>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  logo: <span>IceStack</span>,
  project: {
    link: 'https://github.com/sonofmagic/icestack'
  },
  // sidebar: {
  //   defaultMenuCollapseLevel: 1
  // },

  docsRepositoryBase: 'https://github.com/sonofmagic/icestack/tree/main/website',
  useNextSeoProps() {
    return {
      titleTemplate: '%s | IceStack, Web UI for Mobile, PC, open-source Css component library generator'
    }
  },
  components: {},
  i18n: [
    { locale: 'en-US', text: 'English' },
    { locale: 'zh-CN', text: '简体中文' }
  ],
  footer: {
    component: Footer
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
