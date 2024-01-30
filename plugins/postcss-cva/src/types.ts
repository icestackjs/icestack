export interface UserDefineOption {
  outdir: string
  prefix: string
  importFrom: string
  dryRun: boolean
  cwd: string
  format: string
}

export interface CvaParams {
  base: string[]
  variants: Record<string, Record<string, string[]>>
  compoundVariants: ({ class: string[] } & Record<string, string>)[]
  defaultVariants: Record<string, string>
  meta: Record<string, string>
  file?: string
}

export interface CvaParamsSet {
  base: Set<string>
  variants: Record<string, Record<string, Set<string>>>
  compoundVariants: ({ class: Set<string> } & Record<string, string>)[]
  defaultVariants: Record<string, string>
  meta: Record<string, string>
  file?: string
}

export type CommentType = 'base' | 'variant' | 'compoundVariant' | 'defaultVariant' | 'meta'
