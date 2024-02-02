import { cva, type VariantProps } from "class-variance-authority";
export const defaultVariants = {
  "type": "primary"
};
const index = cva(["btn", "btn-secondary", "rounded"], {
  variants: {
    "type": {
      "primary": ["btn-primary", "shadow-sm"]
    },
    "size": {
      "xs": ["btn-xs"]
    }
  },
  compoundVariants: [{
    "class": ["uppercase", "p-1"],
    "type": ["primary"],
    "size": ["xs"]
  }],
  // @ts-ignore
  defaultVariants: defaultVariants
});
export type Props = VariantProps<typeof index>;
export default index;