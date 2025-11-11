import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        pending:
          "border-transparent bg-yellow-500 text-white [a&]:hover:bg-yellow-500/90",
        success:
          "border-transparent bg-green-500 text-white [a&]:hover:bg-green-500/90",
        admin:
          "border-transparent bg-purple-500/15 text-purple-800 [a&]:hover:bg-purple-500/90",
        parent:
          "border-transparent bg-amber-500/15 text-amber-800 [a&]:hover:bg-amber-500/90",
        student:
          "border-transparent bg-green-500/15 text-green-800 [a&]:hover:bg-green-500/90",
        teacher:
          "border-transparent bg-blue-500/15 text-blue-800 [a&]:hover:bg-blue-500/90",
        bursar:
          "border-transparent bg-yellow-500/15 text-yellow-800 [a&]:hover:bg-yellow-500/90",
        exam_officer:
          "border-transparent bg-orange-500/15 text-orange-800 [a&]:hover:bg-orange-500/90",
        librarian:
          "border-transparent bg-pink-500/15 text-pink-800 [a&]:hover:bg-pink-500/90",
        data_analyst:
          "border-transparent bg-indigo-500/15 text-indigo-800 [a&]:hover:bg-indigo-500/90",
        it_support:
          "border-transparent bg-sky-500/15 text-sky-800 [a&]:hover:bg-sky-500/90",
        principal:
          "border-transparent bg-rose-500/15 text-rose-800 [a&]:hover:bg-rose-500/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/15 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        outlinePrimary:
          "text-primary border-primary [a&]:hover:bg-primary/10 [a&]:hover:text-primary/20",
        outlineSuccess:
          "text-green-500 border-green-500 [a&]:hover:bg-green-500/10 [a&]:hover:text-green-500/20",
        outlinePurple:
          "text-purple-500 border-purple-500 [a&]:hover:bg-purple-500/10 [a&]:hover:text-green-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
