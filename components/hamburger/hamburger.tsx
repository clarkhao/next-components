import { m, SVGMotionProps, Transition } from "framer-motion"
import React from "react"

interface Props extends SVGMotionProps<SVGSVGElement> {
  isOpen?: boolean
  color?: string
  strokeWidth?: string | number
  transition?: Transition
  lineProps?: any
}

const Hamburger = ({
  isOpen = false,
  width = 36,
  height = 24,
  strokeWidth = 2,
  transition = undefined,
  lineProps = null,
  ...props
}: Props) => {
  const variant = isOpen ? "opened" : "closed"
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 2,
    },
  }
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  }
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -2,
    },
  }
  lineProps = {
    strokeWidth: strokeWidth as number,
    vectorEffect: "non-scaling-stroke",
    initial: "closed",
    animate: variant,
    transition,
    ...lineProps,
  }
  const unitHeight = 4
  const unitWidth = (unitHeight * (width as number)) / (height as number)

  return (
    <m.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
      className={"stroke-foreground"}
      {...props}
    >
      <m.line x1="0" x2={unitWidth} y1="0" y2="0" variants={top} {...lineProps} />
      <m.line x1="0" x2={unitWidth} y1="2" y2="2" variants={center} {...lineProps} />
      <m.line x1="0" x2={unitWidth} y1="4" y2="4" variants={bottom} {...lineProps} />
    </m.svg>
  )
}

export { Hamburger }
