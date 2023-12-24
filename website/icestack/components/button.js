/**
 * @type {import('@icestack/ui/types').ComponentsValue}
 */
const config = {
  extend: {
    utils: [
      // Sizes
      `.btn-xl {
        @apply min-h-20 h-20 px-8;
        font-size: 1.25rem;
      }`,
      `.btn-2xl {
        @apply min-h-24 h-24 px-10;
        font-size: 1.5rem;
      }`
    ]
  }
}
module.exports = config
