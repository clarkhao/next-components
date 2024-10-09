import { cva, type VariantProps } from "class-variance-authority"
import { Navigation2 } from "lucide-react"
import React, { ButtonHTMLAttributes, FC, useState } from "react"
import { twMerge } from "tailwind-merge"

const tooltip = cva(
  [
    "text-center",
    "transition-opacity duration-150",
    "flex justify-center items-center",
    "rounded-md",
    "absolute",
    "p-2 whitespace-nowrap",
  ],
  {
    variants: {
      pos: {
        left: ["md:right-[calc(100%+14px)]"],
        right: ["md:left-[calc(100%+14px)]"],
        top: ["md:bottom-[calc(100%+13px)]"],
        bottom: ["md:top-[calc(100%+13px)]"],
      },
      centered: {
        true: [],
        false: [],
      },
      isLeft: {
        true: [],
        false: [],
      },
      bgColor: {
        default: ["bg-accent text-accent-foreground"],
        blue: ["dark:text-blue-800", "dark:bg-blue-100", "bg-blue-900", "text-blue-200"],
        dark: ["dark:text-gray-800", "dark:bg-gray-100", "bg-gray-700", "text-gray-200"],
        red: ["dark:text-red-800", "dark:bg-red-100", "bg-red-900", "text-red-200"],
        green: ["dark:text-green-800", "dark:bg-green-100", "bg-green-900", "text-green-200"],
        yellow: ["dark:text-yellow-800", "dark:bg-yellow-100", "bg-yellow-900", "text-yellow-200"],
        indigo: ["dark:text-indigo-800", "dark:bg-indigo-100", "bg-indigo-900", "text-indigo-200"],
        purple: ["dark:text-purple-800", "dark:bg-purple-100", "bg-purple-900", "text-purple-200"],
        pink: ["dark:text-pink-800", "dark:bg-pink-100", "bg-pink-900", "text-pink-200"],
      },
    },
    compoundVariants: [
      {
        centered: [true, false],
        isLeft: [true, false],
        pos: ["left", "right"],
        className: [
          "md:bottom-1/2 md:translate-y-1/2",
          "max-md:top-[calc(100%+13px)] max-md:translate-x-1/2 max-md:right-1/2",
        ],
      },
      {
        centered: true,
        isLeft: [true, false],
        pos: ["top"],
        className: ["right-1/2 md:translate-x-1/2", "max-md:bottom-[calc(100%+13px)] max-md:translate-x-1/2"],
      },
      {
        centered: true,
        isLeft: [true, false],
        pos: ["bottom"],
        className: ["right-1/2 md:translate-x-1/2", "max-md:top-[calc(100%+13px)] max-md:translate-x-1/2"],
      },
      {
        centered: false,
        isLeft: true,
        pos: ["top"],
        className: ["right-0", "max-md:bottom-[calc(100%+13px)]"],
      },
      {
        centered: false,
        isLeft: true,
        pos: ["bottom"],
        className: ["right-0", "max-md:top-[calc(100%+13px)]"],
      },
      {
        centered: false,
        isLeft: false,
        pos: ["top"],
        className: ["left-0", "max-md:bottom-[calc(100%+13px)]"],
      },
      {
        centered: false,
        isLeft: false,
        pos: ["bottom"],
        className: ["left-0", "max-md:top-[calc(100%+13px)]"],
      },
    ],
  }
)
const arrow = cva(
  [
    "text-center",
    "transition-opacity duration-150",
    "flex justify-center items-center",
    "rounded-md h-auto w-8",
    "absolute",
    "p-2 whitespace-nowrap max-md:right-1/2",
    "animate-fadeInOut",
  ],
  {
    variants: {
      pos: {
        left: ["md:right-[calc(100%-6px)] md:rotate-90"],
        right: ["md:left-[calc(100%-6px)] md:-rotate-90"],
        top: ["md:bottom-[calc(100%-6px)] rotate-180"],
        bottom: ["md:top-[calc(100%-6px)]"],
      },
      bgColor: {
        default: ["fill-accent text-accent"],
        blue: ["dark:text-blue-100", "dark:fill-blue-100", "fill-blue-900", "text-blue-900"],
        dark: ["dark:text-gray-100", "dark:fill-gray-100", "fill-gray-700", "text-gray-700"],
        red: ["dark:text-red-100", "dark:fill-red-100", "fill-red-900", "text-red-900"],
        green: ["dark:text-green-100", "dark:fill-green-100", "fill-green-900", "text-green-900"],
        yellow: ["dark:text-yellow-100", "dark:fill-yellow-100", "fill-yellow-900", "text-yellow-900"],
        indigo: ["dark:text-indigo-100", "dark:fill-indigo-100", "fill-indigo-900", "text-indigo-900"],
        purple: ["dark:text-purple-100", "dark:bg-purple-100", "bg-purple-900", "text-purple-900"],
        pink: ["dark:text-pink-100", "dark:bg-pink-100", "bg-pink-900", "text-pink-900"],
      },
    },
    compoundVariants: [
      {
        pos: ["left", "right"],
        className: ["md:bottom-1/2 md:translate-y-1/2", "max-md:top-[60%] max-md:translate-x-1/2"],
      },
      {
        pos: ["top"],
        className: ["md:right-1/2 md:translate-x-1/2", "max-md:bottom-[60%] max-md:translate-x-1/2"],
      },
      {
        pos: ["bottom"],
        className: ["md:right-1/2 md:translate-x-1/2", "max-md:top-[60%] max-md:translate-x-1/2"],
      },
    ],
  }
)
type TTooltip = {
  children: React.ReactNode
  tips: FC
  isAuto?: boolean
} & VariantProps<typeof tooltip> &
  VariantProps<typeof arrow> &
  ButtonHTMLAttributes<HTMLButtonElement>
export function Tooltip({
  pos,
  bgColor,
  centered = true,
  isLeft = true,
  tips,
  isAuto = true,
  ...props
}: TTooltip) {
  const [showTooltip, setShowTooltip] = useState(isAuto)
  const btnRef = React.useRef<HTMLButtonElement>(null)

  return (
    <>
      <button
        {...props}
        className={twMerge("group relative w-fit")}
        ref={btnRef}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        {props.children}

        <div
          data-show={showTooltip}
          className={twMerge(
            tooltip({ pos, bgColor, centered, isLeft }),
            isAuto
              ? "animate-fadeInOut hidden group-hover:block group-hover:opacity-100 group-focus:block group-focus:opacity-100"
              : "",
            !isAuto ? "animate-fadeInOut data-[show=true]:block data-[show=false]:hidden" : "",
            props.className
          )}
        >
          {tips({})}
        </div>

        <Navigation2
          data-show={showTooltip}
          className={twMerge(
            arrow({ pos, bgColor }),
            isAuto
              ? "animate-fadeInOut hidden group-hover:block group-hover:opacity-100 group-focus:block group-focus:opacity-100"
              : "",
            !isAuto ? "animate-fadeInOut data-[show=true]:block data-[show=false]:hidden" : ""
          )}
        />
      </button>
      {/* 1, use data attribute to conditionally render */}
      {/* 2, use open state of <details> or <dialog> */}
    </>
  )
}
