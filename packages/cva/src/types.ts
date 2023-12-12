import componentsTable from './table'

export interface UserDefinedOptions {
  prefix?: string
}

export type ComponentNames = keyof typeof componentsTable

export type CreateTailwindcssContentOptions = UserDefinedOptions & {
  components?: Record<string, boolean | undefined>
}

export interface InternalOptions {
  prefix: string
}
