import { AppProps } from 'next/app'
import { I18nProvider } from '../locales'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import '../globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <I18nProvider locale={pageProps.locale}>
      <Component {...pageProps} />
    </I18nProvider>
  )
}

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common']))
//       // Will be passed to the page component as props
//     }
//   }
// }

export default MyApp
