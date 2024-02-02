import { cva, type VariantProps } from "class-variance-authority";
export const base = ["btn", "btn-secondary", "rounded"];
export const variants = {
  "type": {
    "primary": ["btn-primary", "shadow-sm"]
  },
  "size": {
    "xs": ["btn-xs"]
  }
};
export const compoundVariants = [{
  "class": ["uppercase", "p-1"],
  "type": ["primary"],
  "size": ["xs"]
}];
export const defaultVariants = {
  "type": "primary"
};
const index = cva(base, {
  variants: variants,
  // @ts-ignore
  compoundVariants: compoundVariants,
  // @ts-ignore
  defaultVariants: defaultVariants
});
export type Props = VariantProps<typeof index>;
export default index;