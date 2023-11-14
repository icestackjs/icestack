import { AppProps } from 'next/app'

// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import '../globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common']))
//       // Will be passed to the page component as props
//     }
//   }
// }

export default MyApp
