import React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = {
  variant: {
    default: "bg-accent text-white hover:bg-red-700",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-gray-800 bg-transparent hover:bg-accent hover:text-white",
    secondary: "bg-gray-900 text-primary hover:bg-gray-800",
    ghost: "hover:bg-accent hover:text-white",
    link: "text-primary underline-offset-4 hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }
};

function getButtonClasses({ variant = "default", size = "default", className = "" }) {
  return cn(
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    buttonVariants.variant[variant],
    buttonVariants.size[size],
    className
  );
}

const Button = React.forwardRef(({ 
  className,
  variant = "default",
  size = "default",
  children,
  ...props 
}, ref) => {
  return (
    <button
      className={getButtonClasses({ variant, size, className })}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };