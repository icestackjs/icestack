import path from 'node:path'
import { scssDir } from '@/dirs'

export function resolve(filename: string) {
  return path.resolve(scssDir, 'components/styled', filename + '.scss')
}
