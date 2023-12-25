import type { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../assets/logo.svg'
import { useI18n } from '../locales'
export const Home: FC = (props) => {
  const t = useI18n()
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
      <div className="flex items-center flex-col">
        <div>
          <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="logo"></Image>
        </div>
        {/* <div></div> */}
        <div className="font-extrabold text-[max(48px,min(5vw,76px))]">@icestack/ui</div>
        <div className="font-extrabold text-2xl mb-5">{t('home.motto')}</div>
        <ul className="[&_li]:flex [&_li]:items-center [&_i]:mr-1 mb-5">
          <li>
            <i className="i-mdi-check-circle text-green-400"></i>
            {t('home.adv0')}
          </li>
          <li>
            <i className="i-mdi-check-circle text-green-400"></i>
            {t('home.adv1')}
          </li>
          <li>
            <i className="i-mdi-check-circle text-green-400"></i>
            {t('home.adv2')}
          </li>
          <li>
            <i className="i-mdi-check-circle text-green-400"></i>
            {t('home.adv3')}
          </li>
        </ul>
        <div className="space-x-6">
          <Link className="btn btn-primary outline-none" href="docs/usage">
            {t('home.startBtnText')}
          </Link>
          <Link className="btn btn-success outline-none" href="components/overview">
            {t('home.componentsBtnText')}
          </Link>
        </div>
      </div>
    </div>
  )
}
