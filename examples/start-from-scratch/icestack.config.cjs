/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  mode: 'none',
  outdir: './my-ui',
  components: {
    button: {
      selector: '.cbtn',
      schema: ({ selector }) => {
        return {
          selector,
          defaults: {
            base: `
            ${selector} {
              @apply relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center;
            
              &::after {
                content: '';
                @apply absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-75%] transition-all bg-white/30 z-20 duration-1000;
              }
            
              &:hover::after {
                @apply translate-x-[50%];
              }
            }
            `
          }
        }
      }
    }
  }
}

module.exports = config
