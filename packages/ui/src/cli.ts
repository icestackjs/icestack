import { cli } from '@icestack/cli'
import { version } from '../package.json'

cli.version(version)
cli.parse()
