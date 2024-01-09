import { UtilitiesOptions } from '@icestack/types'
import glass from './utilities/glass'
import variables from './utilities/variables'

export const utilities = <Partial<UtilitiesOptions>>{
  extraCss: [glass(), variables()]
}
