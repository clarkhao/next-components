import { Diamond, Loader, LoaderCircle, LoaderPinwheel } from "lucide-react"
import React, { HTMLAttributes } from "react"

export type TSpinnerProps = {
  pattern: number
} & HTMLAttributes<SVGSVGElement>

export const Spinner = React.forwardRef<SVGSVGElement, TSpinnerProps>(({ pattern, ...props }, ref) => {
  switch (pattern) {
    case 1:
      return (
        <Loader
          ref={ref}
          {...props}
          className="text-light-on-primary-light-variant dark:text-dark-on-primary-dark-variant h-auto w-8 animate-spin"
        />
      )
    case 2:
      return (
        <LoaderCircle
          ref={ref}
          {...props}
          className="text-light-on-primary-light-variant dark:text-dark-on-primary-dark-variant h-auto w-8 animate-spin"
        />
      )
    case 3:
      return (
        <LoaderPinwheel
          ref={ref}
          {...props}
          className="text-light-on-primary-light-variant dark:text-dark-on-primary-dark-variant h-auto w-8 animate-spin"
        />
      )
    default:
      return (
        <Diamond
          ref={ref}
          {...props}
          className="text-light-on-primary-light-variant dark:text-dark-on-primary-dark-variant h-auto w-8 animate-spin"
        />
      )
  }
})
Spinner.displayName = "Spinner"
