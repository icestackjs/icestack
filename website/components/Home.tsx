import type { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../assets/logo.svg'
export const Home: FC = (props) => {
  return (
    <div className="flex items-center flex-col">
      {/* <div>
        <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="logo"></Image>
      </div> */}
      {/* <div></div> */}
      <div className="font-extrabold text-[max(48px,min(5vw,76px))]">@icestack/ui</div>
      <div className="font-extrabold text-2xl mb-10">Build your own Css UI libraries!</div>
      <div className="space-x-6">
        <Link className="btn btn-primary outline-none" href="docs/introduction">
          Get started
        </Link>
        <Link className="btn btn-success outline-none" href="components">
          See Css Components
        </Link>
      </div>
    </div>
  )
}
