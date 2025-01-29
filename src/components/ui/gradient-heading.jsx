import React from "react";
import { cn } from "../../lib/utils";

const headingVariants = {
  variant: {
    default: "bg-gradient-to-t from-neutral-700 to-neutral-800",
    pink: "bg-gradient-to-t from-accent to-accent/90",
    light: "bg-gradient-to-t from-neutral-200 to-neutral-300",
    secondary: "bg-gradient-to-t from-neutral-500 to-neutral-600",
  },
  size: {
    default: "text-2xl sm:text-3xl lg:text-4xl",
    xxs: "text-base sm:text-lg lg:text-lg",
    xs: "text-lg sm:text-xl lg:text-2xl",
    sm: "text-xl sm:text-2xl lg:text-3xl",
    md: "text-2xl sm:text-3xl lg:text-4xl",
    lg: "text-3xl sm:text-4xl lg:text-5xl",
    xl: "text-4xl sm:text-5xl lg:text-6xl",
    xll: "text-5xl sm:text-6xl lg:text-[5.4rem] lg:leading-[0.5rem]",
    xxl: "text-5xl sm:text-6xl lg:text-[6rem]",
    xxxl: "text-5xl sm:text-6xl lg:text-[8rem]",
  },
  weight: {
    default: "font-bold",
    thin: "font-thin",
    base: "font-base",
    semi: "font-semibold",
    bold: "font-bold",
    black: "font-black",
  },
};

export function GradientHeading({
  variant = "default",
  size = "default",
  weight = "default",
  className,
  children,
  ...props
}) {
  return (
    <h3 {...props} className={className}>
      <span
        className={cn(
          "tracking-tight pb-3 bg-clip-text text-transparent",
          headingVariants.variant[variant],
          headingVariants.size[size],
          headingVariants.weight[weight]
        )}
      >
        {children}
      </span>
    </h3>
  );
}