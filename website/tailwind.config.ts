import type { Config } from 'tailwindcss'
import iceui from '@icestack/ui/tailwindcss'
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './theme.config.jsx'],
  theme: {},
  plugins: [iceui]
}
export default config
