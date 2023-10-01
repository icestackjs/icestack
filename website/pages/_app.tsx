import { AppProps } from 'next/app'
import '../globals.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
