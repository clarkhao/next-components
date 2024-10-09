import { cva, VariantProps } from "class-variance-authority"
import React, { HTMLAttributes, HTMLInputTypeAttribute } from "react"
import { twMerge } from "tailwind-merge"

const toggle = cva("", {
  variants: {
    size: {
      sm: ["w-[42px] h-6 after:h-5 after:w-5"],
      md: ["w-[50px] h-7 after:h-6 after:w-6"],
      lg: ["w-[58px] h-8 after:h-7 after:w-7"],
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type TToggle = {
  text?: Array<string>
  disabled?: boolean
} & VariantProps<typeof toggle> &
  HTMLAttributes<HTMLInputElement>

export function Toggle({ size, disabled = false, text, ...props }: TToggle) {
  const [on, setOn] = React.useState(false)
  const keyboardHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key)
    switch (e.key) {
      case "Enter":
        setOn(false)
        break
      default:
        break
    }
  }
  return (
    <>
      <label className="inline-flex cursor-pointer items-center">
        <input
          {...props}
          type="checkbox"
          value=""
          className="peer sr-only"
          onClick={() => setOn(!on)}
          onKeyDown={keyboardHandler}
          disabled={disabled}
        />
        <div
          className={twMerge(
            toggle({ size }),
            "relative bg-muted outline-none transition-all duration-500",
            "rounded-full",
            "peer-focus:outline-none peer-focus:ring peer-focus:ring-ring peer-focus:ring-offset-2 peer-focus:ring-offset-background",
            "peer-checked:bg-primary peer-checked:after:translate-x-full  peer-checked:after:border-gray-100",
            "after:absolute after:start-0 after:top-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:duration-150 after:content-['']"
          )}
        ></div>
        {text ? (
          <span
            className={twMerge(
              "ms-3 font-medium text-gray-900 dark:text-gray-300",
              size === "sm" ? "text-sm" : "text-base"
            )}
          >
            {!on ? text[0] : text[1]}
          </span>
        ) : null}
      </label>
    </>
  )
}
