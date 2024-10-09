import { cva, VariantProps } from "class-variance-authority"
import React, { InputHTMLAttributes } from "react"
import { cn } from "lib/utils"

const checkbox = cva(
  [
    "peer shrink-0 ",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "focus:ring accent-primary focus:ring-offset-1 focus:ring-ring",
  ],
  {
    variants: {
      shape: {
        square: ["rounded"],
        text: ["read-only hidden"],
      },
      height: {
        sm: ["size-4"],
        md: ["size-5"],
      },
    },
    defaultVariants: {
      shape: "square",
      height: "sm",
    },
  }
)

export type TCheckbox = {
  text: string
} & InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof checkbox>

export const Checkbox = React.forwardRef<HTMLInputElement, TCheckbox>(({ shape, height, text, ...props }, ref) => {
  const id = React.useId()
  return (
    <div className="flex items-center">
      <input
        ref={ref}
        {...props}
        id={id}
        type="checkbox"
        value=""
        className={cn(checkbox({ shape, height }))}
      />
      <label
        htmlFor={id}
        className={cn(
          "ms-2 font-medium text-gray-900 dark:text-gray-300",
          height === "sm" ? "text-sm" : "text-base",
          shape === "text" &&
            "cursor-pointer rounded-full bg-muted px-4 py-1 text-muted-foreground shadow-sm".concat(
              " peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:ring-2 peer-checked:ring-ring peer-checked:ring-offset-1 "
            ),
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        )}
      >
        {text}
      </label>
    </div>
  )
})
Checkbox.displayName = "Checkbox"
