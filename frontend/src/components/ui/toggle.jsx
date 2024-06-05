import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "yinline-flex yitems-center yjustify-center yrounded-md ytext-sm yfont-medium yring-offset-background ytransition-colors hover:ybg-muted hover:ytext-muted-foreground focus-visible:youtline-none focus-visible:yring-2 focus-visible:yring-ring focus-visible:yring-offset-2 disabled:ypointer-events-none disabled:yopacity-50 data-[state=on]:ybg-accent data-[state=on]:ytext-accent-foreground",
  {
    variants: {
      variant: {
        default: "ybg-transparent",
        outline:
          "yborder yborder-input ybg-transparent hover:ybg-accent hover:ytext-accent-foreground",
      },
      size: {
        default: "yh-10 ypx-3",
        sm: "yh-9 ypx-2.5",
        lg: "yh-11 ypx-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
