import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, typePrefix } from './share'
export type AlertProps = VariantProps<typeof alert> & { textContent?: string }

export const allTypes = typePrefix('alert')

const alert = cva(['alert'], {
  variants: {
    type: expands(allTypes)
  },
  defaultVariants: {}
})

export const createAlert = (props: AlertProps) => {
  const div = document.createElement('div')
  div.className = alert(props)
  const icon = document.createElement('i')
  icon.className = 'i-mdi-information-outline w-6 h-6'
  div.append(icon)
  const span = document.createElement('span')
  span.textContent = 'Hello world!'
  div.append(span)
  return div
}
