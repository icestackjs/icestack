import { cva, VariantProps } from "class-variance-authority";
const index = cva(["btn", "rounded"], {
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
  defaultVariants: {
    "type": "primary"
  }
});
export type Props = VariantProps<typeof index>;
export default index;