import { cva, VariantProps } from "class-variance-authority";
const index = cva(["btn"], {
  variants: {
    "type": {
      "primary": ["btn-primary"],
      "secondary": ["btn-secondary"]
    },
    "size": {
      "md": ["btn-md"],
      "xs": ["btn-xs"],
      "sm": ["btn-sm"]
    }
  },
  compoundVariants: [{
    "class": ["btn-pointer"],
    "type": ["primary"],
    "size": ["md"]
  }, {
    "class": ["btn-disabled"],
    "type": ["primary"],
    "size": ["xs"]
  }],
  defaultVariants: {
    "size": "md",
    "type": "primary"
  }
});
export type Props = VariantProps<typeof index>;
export default index;