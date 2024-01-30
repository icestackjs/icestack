import { cva, VariantProps } from "class-variance-authority";
const index = cva(["com"], {
  variants: {
    "type": {
      "p": ["com-p"],
      "z": ["com-z"]
    }
  },
  compoundVariants: [{
    "class": ["com-disabled"],
    "type": ["p"]
  }],
  defaultVariants: {
    "type": "p"
  }
});
export type Props = VariantProps<typeof index>;
export default index;