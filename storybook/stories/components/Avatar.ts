import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import Pig from '../assets/image/pig.jpg'
import { formatHtml } from './share'
export type AvatarProps = VariantProps<typeof avatar> & { textContent?: string; wrapperClassName?: string }

// export const allTypes = typePrefix('avatar-')

const avatar = cva(['avatar'], {
  variants: {},
  defaultVariants: {}
})

export const createAvatar = (props: AvatarProps) => {
  return formatHtml(`<div class="${avatar(props)}">
  <div class="${props.wrapperClassName ?? 'w-24 rounded'}">
  <img src="${Pig}"/></div>
    </div>`)
}
