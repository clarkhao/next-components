import { interpolateString, select } from "d3"
import React from "react"

type TNumber = {
  start: number
  end: number
  size: "sm" | "md" | "lg"
  fixed: number
}

export function Number({ start, end, fixed = 2, ...props }: TNumber) {
  const numberRef = React.useRef<HTMLDivElement>(null)
  const getSize = React.useCallback(() => {
    switch (props.size) {
      case "sm":
        return "text-sm"
      case "md":
        return "text-base"
      case "lg":
        return "text-xl"
      default:
        return "text-base"
    }
  }, [props.size])
  React.useEffect(() => {
    select(numberRef.current)
      .transition()
      .tween("text", () => {
        const interpolator = interpolateString(
          parseFloat(`${start}`).toFixed(fixed) ?? 0.0,
          parseFloat(`${end}`).toFixed(fixed)
        )
        return function (t) {
          select(this).text(parseFloat(interpolator(t)).toFixed(fixed))
        }
      })
      .duration(1000)
  }, [numberRef, start, end])
  return <span className={["w-full text-black dark:text-white", getSize()].join(" ")} ref={numberRef}></span>
}
