import type { GetCssSchemaMethod } from '@/types'
import { css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: css`
        ${selector} {
          // @b
          @apply relative flex flex-col;
          &:focus {
            @apply outline-none;
          }
          &-body {
            @apply flex flex-auto flex-col;
            :where(p) {
              @apply flex-grow;
            }
          }
          &-actions {
            @apply flex flex-wrap items-start gap-2;
          }
          & figure {
            @apply flex items-center justify-center;
          }
          &.image-full {
            @apply grid;
            &:before {
              @apply relative;
              content: '';
            }
            &:before,
            & > * {
              @apply col-start-1 row-start-1;
            }
            & > figure img {
              @apply h-full object-cover;
            }
          }
          &.image-full > &-body {
            @apply relative;
          }
        }
      `,
      styled: css`
        ${selector} {
          @apply rounded-box;
          :where(figure:first-child) {
            @apply overflow-hidden;
            border-start-start-radius: inherit;
            border-start-end-radius: inherit;
            border-end-start-radius: unset;
            border-end-end-radius: unset;
          }
          :where(figure:last-child) {
            @apply overflow-hidden;
            border-start-start-radius: unset;
            border-start-end-radius: unset;
            border-end-start-radius: inherit;
            border-end-end-radius: inherit;
          }
          &:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
          }
          &.bordered {
            @apply border-base-200 border;
          }
          &-bordered {
            @apply border-base-200 border;
          }
          &.compact {
            ${selector}-body {
              @apply p-4 text-sm;
            }
          }
          &-body {
            padding: var(--padding-card, 2rem);
            @apply flex flex-col gap-2;
          }
          &-title {
            @apply flex items-center gap-2 text-xl font-semibold;
          }
          &.image-full {
            &:before {
              @apply bg-neutral rounded-box z-10 opacity-75;
            }
          }
          &.image-full > &-body {
            @apply text-neutral-content z-20;
          }
          &.image-full {
            :where(figure) {
              @apply overflow-hidden;
              border-radius: inherit;
            }
          }
        }
      `,
      utils: css`
        ${selector}-side {
          align-items: stretch;
          flex-direction: row;
          :where(figure:first-child) {
            @apply overflow-hidden;
            border-start-start-radius: inherit;
            border-start-end-radius: unset;
            border-end-start-radius: inherit;
            border-end-end-radius: unset;
          }
          :where(figure:last-child) {
            @apply overflow-hidden;
            border-start-start-radius: unset;
            border-start-end-radius: inherit;
            border-end-start-radius: unset;
            border-end-end-radius: inherit;
          }
          & figure > * {
            max-width: unset;
          }
        }
        :where(${selector}-side figure > *) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        ${selector}-compact {
          ${selector}-body {
            @apply p-4 text-sm;
          }
          ${selector}-title {
            @apply mb-1;
          }
        }
        ${selector}-normal {
          ${selector}-body {
            padding: var(--padding-card, 2rem);
            @apply text-base;
          }
          ${selector}-title {
            @apply mb-3;
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
