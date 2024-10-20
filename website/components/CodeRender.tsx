import type { PropsWithChildren } from 'react'
import { cx } from '@icestack/cva'
import parse from 'html-react-parser'

export default function Index({ code, className }: PropsWithChildren<{ code?: string, className?: string }>) {
  return <div className={cx('flex border-base-300 border rounded min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center p-4', className)}>{parse(code)}</div>
}
