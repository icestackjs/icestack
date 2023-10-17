import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import icebreakerAvatar from './assets/image/icebreaker.jpeg'
export type AvatarProps = VariantProps<typeof avatar> & { textContent?: string }

// export const allTypes = typePrefix('avatar-')

const avatar = cva(['avatar'], {
  variants: {},
  defaultVariants: {}
})

export const createAvatar = (props: AvatarProps) => {
  const div = document.createElement('div')
  div.className = avatar(props)
  const wrapperDiv = document.createElement('div')
  wrapperDiv.className = 'w-24 rounded'
  const img = document.createElement('img')
  wrapperDiv.append(img)
  img.src = icebreakerAvatar
  div.append(wrapperDiv)
  return div
}
