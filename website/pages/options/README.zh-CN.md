@icestack/ui

# @icestack/ui

## Table of contents

### Interfaces

- [IBuildScssOptions](interfaces/IBuildScssOptions.md)

### Type Aliases

- [BaseOptions](README.md#baseoptions)
- [CodegenMode](README.md#codegenmode)
- [CodegenOptions](README.md#codegenoptions)
- [ComponentsOptions](README.md#componentsoptions)
- [ComponentsValue](README.md#componentsvalue)
- [Config](README.md#config)
- [DeepPartial](README.md#deeppartial)
- [DeepRequired](README.md#deeprequired)
- [GlobalOptions](README.md#globaloptions)
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

[types.ts:17](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L17)

___

### CodegenMode

Ƭ **CodegenMode**: ``"styled"`` \| ``"base"`` \| ``"raw"``

#### Defined in

[types.ts:67](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L67)

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
| `prefix` | `string` \| `PrefixerOptions` |
| `presets` | [`DeepPartial`](README.md#deeppartial)\<[`CodegenOptions`](README.md#codegenoptions)\>[] |
| `tailwindcssConfig` | `TailwindcssConfig` |
| `varPrefix` | `string` |

#### Defined in

[types.ts:73](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L73)

___

### ComponentsOptions

Ƭ **ComponentsOptions**: `Record`\<typeof `componentsNames`[`number`], [`ComponentsValue`](README.md#componentsvalue)\>

#### Defined in

[types.ts:48](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L48)

___

### ComponentsValue

Ƭ **ComponentsValue**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `extend` | [`ModeMergeValue`](README.md#modemergevalue) |
| `extra` | `CssInJs` |
| `mode` | [`CodegenMode`](README.md#codegenmode) |
| `override` | [`ModeMergeValue`](README.md#modemergevalue) |
| `selector` | `string` |

#### Defined in

[types.ts:36](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L36)

___

### Config

Ƭ **Config**: `Partial`\<[`CodegenOptions`](README.md#codegenoptions)\>

#### Defined in

[types.ts:102](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L102)

___

### DeepPartial

Ƭ **DeepPartial**\<`T`\>: \{ [P in keyof T]?: T[P] extends object ? DeepPartial\<T[P]\> : Partial\<T[P]\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:122](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L122)

___

### DeepRequired

Ƭ **DeepRequired**\<`T`\>: `Required`\<\{ [K in keyof T]: T[K] extends Required\<T[K]\> ? T[K] : DeepRequired\<T[K]\> }\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:126](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L126)

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

[types.ts:50](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L50)

___

### LoadCodeOptions

Ƭ **LoadCodeOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `loaddir` | `string` |

#### Defined in

[types.ts:69](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L69)

___

### ModeMergeValue

Ƭ **ModeMergeValue**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `base?` | `CssInJs` |
| `styled?` | `CssInJs` |
| `utils?` | `CssInJs` |

#### Defined in

[types.ts:30](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L30)

___

### TailwindcssPluginOptions

Ƭ **TailwindcssPluginOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `loaddir` | `string` |

#### Defined in

[types.ts:104](https://github.com/sonofmagic/icestack/blob/4232246/packages/ui/src/types.ts#L104)
