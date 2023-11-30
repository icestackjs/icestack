@icestack/ui

# @icestack/ui

## Table of contents

### Type Aliases

- [BaseOptions](README.md#baseoptions)
- [CodegenMode](README.md#codegenmode)
- [CodegenOptions](README.md#codegenoptions)
- [ComponentsOptions](README.md#componentsoptions)
- [ComponentsValue](README.md#componentsvalue)
- [Config](README.md#config)
- [CssInJs](README.md#cssinjs)
- [DeepPartial](README.md#deeppartial)
- [DeepRequired](README.md#deeprequired)
- [GlobalOptions](README.md#globaloptions)
- [ILayer](README.md#ilayer)
- [LoadCodeOptions](README.md#loadcodeoptions)
- [ModeMergeValue](README.md#modemergevalue)
- [TailwindcssPluginOptions](README.md#tailwindcsspluginoptions)

## Type Aliases

### BaseOptions

Ƭ **BaseOptions**\<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` = `string` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `extraColors` | `Record`\<keyof [`BaseOptions`](README.md#baseoptions)[``"themes"``], `Record`\<`string`, `string`\>\> |
| `extraVars` | `Record`\<keyof [`BaseOptions`](README.md#baseoptions)[``"themes"``], `Record`\<`string`, `string`\>\> |
| `themes` | `Record`\<`T`, \{ `selector`: `string`  }\> |
| `types` | `Record`\<`string`, `Record`\<keyof [`BaseOptions`](README.md#baseoptions)[``"themes"``], `Record`\<`string`, `string`\>\>\> |

#### Defined in

[packages/ui/src/types.ts:18](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L18)

___

### CodegenMode

Ƭ **CodegenMode**: ``"styled"`` \| ``"base"`` \| ``"raw"``

#### Defined in

[packages/ui/src/types.ts:67](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L67)

___

### CodegenOptions

Ƭ **CodegenOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `base` | [`BaseOptions`](README.md#baseoptions) |
| `cache` | `boolean` |
| `components` | [`ComponentsOptions`](README.md#componentsoptions) |
| `dryRun` | `boolean` |
| `global` | [`GlobalOptions`](README.md#globaloptions) |
| `log` | `boolean` |
| `mode` | [`CodegenMode`](README.md#codegenmode) |
| `outdir` | `string` |
| `prefix` | `PrefixerOptions` |
| `presets` | ([`DeepPartial`](README.md#deeppartial)\<[`CodegenOptions`](README.md#codegenoptions)\> \| (`options?`: `any`) => [`DeepPartial`](README.md#deeppartial)\<[`CodegenOptions`](README.md#codegenoptions)\>)[] |
| `tailwindcssConfig` | `TailwindcssConfig` |
| `varPrefix` | `string` |

#### Defined in

[packages/ui/src/types.ts:73](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L73)

___

### ComponentsOptions

Ƭ **ComponentsOptions**: `Record`\<`string`, [`ComponentsValue`](README.md#componentsvalue) \| ``false``\>

#### Defined in

[packages/ui/src/types.ts:48](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L48)

___

### ComponentsValue

Ƭ **ComponentsValue**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `disabled` | `boolean` |
| `extend` | [`ModeMergeValue`](README.md#modemergevalue) |
| `extra` | [`CssInJs`](README.md#cssinjs) |
| `mode` | [`CodegenMode`](README.md#codegenmode) |
| `override` | [`ModeMergeValue`](README.md#modemergevalue) |
| `prefix` | `PrefixerOptions` |
| `schema` | `GetSchemaFn` |
| `selector` | `string` |

#### Defined in

[packages/ui/src/types.ts:37](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L37)

___

### Config

Ƭ **Config**: `Partial`\<[`CodegenOptions`](README.md#codegenoptions)\>

#### Defined in

[packages/ui/src/types.ts:102](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L102)

___

### CssInJs

Ƭ **CssInJs**: `Record`\<`string`, `any`\>

CSS-in-JS object

#### Defined in

node_modules/.pnpm/@types+postcss-js@4.0.4/node_modules/@types/postcss-js/index.d.ts:5

___

### DeepPartial

Ƭ **DeepPartial**\<`T`\>: \{ [P in keyof T]?: T[P] extends object ? DeepPartial\<T[P]\> : Partial\<T[P]\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/ui/src/types.ts:118](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L118)

___

### DeepRequired

Ƭ **DeepRequired**\<`T`\>: `Required`\<\{ [K in keyof T]: T[K] extends Required\<T[K]\> ? T[K] : DeepRequired\<T[K]\> }\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/ui/src/types.ts:122](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L122)

___

### GlobalOptions

Ƭ **GlobalOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `atMedia` | \{ `hover`: `boolean`  } |
| `atMedia.hover` | `boolean` |
| `pseudo` | \{ `where`: `boolean`  } |
| `pseudo.where` | `boolean` |
| `selector` | \{ `universal`: `string`  } |
| `selector.universal` | `string` |

#### Defined in

[packages/ui/src/types.ts:50](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L50)

___

### ILayer

Ƭ **ILayer**: ``"base"`` \| ``"utilities"`` \| ``"components"``

#### Defined in

[packages/ui/src/types.ts:128](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L128)

___

### LoadCodeOptions

Ƭ **LoadCodeOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `loadDirectory` | `string` |

#### Defined in

[packages/ui/src/types.ts:69](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L69)

___

### ModeMergeValue

Ƭ **ModeMergeValue**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `base?` | [`CssInJs`](README.md#cssinjs) |
| `styled?` | [`CssInJs`](README.md#cssinjs) |
| `utils?` | [`CssInJs`](README.md#cssinjs) |

#### Defined in

[packages/ui/src/types.ts:31](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L31)

___

### TailwindcssPluginOptions

Ƭ **TailwindcssPluginOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `loadDirectory` | `string` |

#### Defined in

[packages/ui/src/types.ts:104](https://github.com/sonofmagic/icestack/blob/e6652f6/packages/ui/src/types.ts#L104)
