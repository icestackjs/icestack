export const layerNodes = {
  base: null,
  components: null,
  utilities: null
  // variants: null
}

export type LayerEnumType = 'base' | 'components' | 'utilities'
// export const packageJson = require('../package.json')

// packageJson.version as string

export const markedLayerKey = Symbol('__tw_layer_name__')

export const layerNodesKeys = Object.keys(layerNodes)

export { version } from '../package.json'
