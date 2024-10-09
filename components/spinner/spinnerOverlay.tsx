import React from "react"
import { Spinner, TSpinnerProps } from "./spinner_pattern_a"
import { cn } from "lib/utils"

type TSpinnerOverlayProps = {
  overlayed: boolean
} & TSpinnerProps

export function SpinnerOverlay({ overlayed = true, pattern, ...props }: TSpinnerOverlayProps) {
  return (
    <div className={cn("fixed left-0 top-0 h-full w-full bg-gray-100/60", overlayed ? "z-50" : "z-0")}>
      <span className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner pattern={pattern} {...props} />
      </span>
    </div>
  )
}
