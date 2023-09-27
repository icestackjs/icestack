export const layerNodes = {
  base: null,
  components: null,
  utilities: null
  // variants: null
}

export const packageJson = require('../package.json')

export const version = packageJson.version as string

export const markedLayerKey = Symbol('__tw_layer_name__')

export const layerNodesKeys = Object.keys(layerNodes)
