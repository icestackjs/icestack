import { AppProps } from 'next/app'
import Script from 'next/script'
import { I18nProvider } from '../locales'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import '../globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <I18nProvider locale={pageProps.locale}>
      <Component {...pageProps} />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-03BGG90X2C" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-03BGG90X2C');
        `}
      </Script>
      <Script id="baidu-analytics">{`var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?05397e75aea8e6211394440e776de61f";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`}</Script>
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
