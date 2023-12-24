import { PropsWithChildren } from 'react'
import parse from 'html-react-parser'

export default function Index({ code }: PropsWithChildren<{ code?: string }>) {
  return <div className="flex border-base-300 border rounded min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center p-4">{parse(code)}</div>
}
