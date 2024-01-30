import { cva, VariantProps } from "class-variance-authority";
const index = cva(["cbtn"], {
  variants: {},
  compoundVariants: [],
  defaultVariants: {}
});
export type Props = VariantProps<typeof index>;
export default index;