/**
 * @type {import('@icestack/ui/types').ComponentsValue}
 */
const config = {
  // ...
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
      }`,
      `.btn-3xl {
        @apply min-h-28 h-28 px-12;
        font-size: 1.75rem;
      }`,
      ({ selector }) => {
        return `
        ${selector}-4xl {
          @apply min-h-32 h-32 px-14;
          font-size: 2rem;
        }
        `
      }
    ]
  }
}
module.exports = config
