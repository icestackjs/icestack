import { cva, type VariantProps } from "class-variance-authority";
export const base = ["btn"];
export const variants = {
  "type": {
    "primary": ["btn-primary"],
    "secondary": ["btn-secondary"],
    "third": ["btn-third"]
  },
  "disabled": {
    "true": ["btn-disabled"]
  },
  "size": {
    "lg": ["btn-lg"],
    "md": ["btn-md"],
    "sm": ["btn-sm"],
    "xs": ["btn-xs"]
  }
};
export const compoundVariants = [];
export const defaultVariants = {};
const index = cva(base, {
  variants: variants,
  // @ts-ignore
  compoundVariants: compoundVariants,
  // @ts-ignore
  defaultVariants: defaultVariants
});
export type Props = VariantProps<typeof index>;
export default index;