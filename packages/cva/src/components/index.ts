// import type { VariantProps } from 'class-variance-authority'
import button from './button'
import loading from './loading'
import mask from './mask'

export type { VariantProps } from 'class-variance-authority'

export function createCva() {
  return {
    button,
    loading,
    mask
  }
}
