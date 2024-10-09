"use client"
import { cva, VariantProps } from "class-variance-authority"
import React, { forwardRef } from "react"
import { ButtonWrapper } from "components/button/button_v2"
import { Typing } from "../text-animation/typing"
import { TypingContext, useTyping } from "../text-animation/typingHook"
import { AlertCircleIcon, CircleCheckIcon, CircleXIcon, Info, XIcon } from "lucide-react"
import { cn } from "lib/utils"
import { PaperPlane } from "components/icons/icons"
import { HTMLMotionProps, m, Variants } from "framer-motion"
import { animationVariants } from "lib/animate"

const toast = cva(["group flex items-center gap-x-1 sm:gap-x-2 max-w-sm w-[384px] p-1 sm:p-2 rounded-lg relative"], {
  variants: {
    variant: {
      default: ["shadow-md ", "text-gray-500 bg-white dark:text-gray-300 dark:bg-gray-600"],
      colored: [],
    },
    colors: {
      info: [],
      success: [],
      error: [],
      warning: [],
      msg: [],
    },
  },
  compoundVariants: [
    {
      variant: "colored",
      colors: ["info"],
      className: [
        "text-blue-800",
        "bg-blue-100",
        "hover:bg-blue-200",
        "hover:text-blue-800/80",
        "dark:bg-blue-900",
        "dark:text-blue-200",
        "dark:hover:bg-blue-700",
        "dark:hover:text-blue-100",
      ],
    },
    {
      variant: "colored",
      colors: "success",
      className: [
        "text-green-800",
        "bg-green-100",
        "hover:bg-green-200",
        "hover:text-green-800/80",
        "dark:bg-green-900",
        "dark:text-green-200",
        "dark:hover:bg-green-700",
        "dark:hover:text-green-100",
      ],
    },
    {
      variant: "colored",
      colors: "error",
      className: [
        "text-red-800",
        "bg-red-100",
        "hover:bg-red-200",
        "hover:text-red-800/80",
        "dark:bg-red-900",
        "dark:text-red-200",
        "dark:hover:bg-red-700",
        "dark:hover:text-red-100",
      ],
    },
    {
      variant: "colored",
      colors: "warning",
      className: [
        "text-yellow-800",
        "bg-yellow-100",
        "hover:bg-yellow-200",
        "hover:text-yellow-800/80",
        "dark:bg-yellow-900",
        "dark:text-yellow-200",
        "dark:hover:bg-yellow-700",
        "dark:hover:text-yellow-100",
      ],
    },
    {
      variant: "colored",
      colors: "msg",
      className: ["bg-secondary text-secondary-foreground", "hover:bg-accent hover:text-accent-foreground"],
    },
  ],
  defaultVariants: {
    variant: "default",
  },
})
const xbtn = cva("focus:ring-0", {
  variants: {
    variant: {
      default: ["dark:active:bg-gray-700"],
      colored: [],
    },
    colors: {
      info: [],
      success: [],
      error: [],
      warning: [],
      msg: [],
    },
  },
  compoundVariants: [
    {
      variant: "colored",
      colors: ["info"],
      className: [
        "text-blue-600",
        "hover:bg-blue-300",
        "hover:text-blue-900",
        "dark:hover:bg-blue-800",
        "dark:hover:text-blue-300",
        "active:bg-blue-100",
        "dark:active:bg-blue-600",
      ],
    },
    {
      variant: "colored",
      colors: "success",
      className: [
        "text-green-600",
        "hover:bg-green-300",
        "hover:text-green-900",
        "dark:hover:bg-green-800",
        "dark:hover:text-green-300",
        "active:bg-green-100",
        "dark:active:bg-green-600",
      ],
    },
    {
      variant: "colored",
      colors: "error",
      className: [
        "text-red-600",
        "hover:bg-red-300",
        "hover:text-red-900",
        "dark:hover:bg-red-800",
        "dark:hover:text-red-300",
        "active:bg-red-100",
        "dark:active:bg-red-600",
      ],
    },
    {
      variant: "colored",
      colors: "warning",
      className: [
        "text-yellow-600",
        "hover:bg-yellow-300",
        "hover:text-yellow-900",
        "dark:hover:bg-yellow-800",
        "dark:hover:text-yellow-300",
        "active:bg-yellow-100",
        "dark:active:bg-yellow-600",
      ],
    },
    {
      variant: "colored",
      colors: "msg",
      className: ["text-accent-foreground", "hover:bg-primary hover:text-primary-foreground"],
    },
  ],
  defaultVariants: {
    variant: "default",
    colors: "info",
  },
})
const progress = cva("absolute h-0.5 sm:h-1 bottom-0 left-0 group-hover:pause", {
  variants: {
    colors: {
      info: ["bg-blue-500 dark:bg-blue-300"],
      success: ["bg-green-500 dark:bg-green-300"],
      error: ["bg-red-500 dark:bg-red-300"],
      warning: ["bg-yellow-500 dark:bg-yellow-300"],
      msg: ["bg-primary"],
    },
  },
})

type TToast = {
  msg: string
  timed: "sm" | "md" | "lg" | null
  display: "standard" | "writer"
  animateEffect?: "scale" | "yMotion" | "xMotion"
  handleDel: () => void
} & VariantProps<typeof toast> &
  HTMLMotionProps<"div">
export type Ref = HTMLDivElement

export const Toast = forwardRef<Ref, TToast>(function Toast(
  { variant, colors, display, timed, msg, animateEffect, handleDel, ...props }: TToast,
  ref
) {
  const { typingStates, typingDispatch } = useTyping()
  const spanRef = React.useRef<HTMLSpanElement>(null)
  const delHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDel()
  }
  const getIcon = () => {
    switch (colors) {
      case "info":
        return (
          <span className="flex size-6 items-center justify-center rounded-xl bg-blue-600 sm:size-8">
            <Info className="h-auto w-4 text-white sm:w-6 " />
          </span>
        )
      case "success":
        return (
          <span className="flex size-6 items-center justify-center rounded-xl bg-green-600 sm:size-8">
            <CircleCheckIcon className="h-auto w-4 text-white sm:w-6" />
          </span>
        )
      case "error":
        return (
          <span className="flex size-6 items-center justify-center rounded-xl bg-destructive sm:size-8">
            <CircleXIcon className="h-auto w-4 text-white sm:w-6" />
          </span>
        )
      case "warning":
        return (
          <span className="flex size-6 items-center justify-center rounded-xl bg-orange-500 sm:size-8">
            <AlertCircleIcon className="h-auto w-4 text-white sm:w-6" />
          </span>
        )
      case "msg":
        return (
          <span className="flex size-6 items-center justify-center rounded-xl bg-primary sm:size-8">
            <PaperPlane className="h-auto w-3 fill-white stroke-gray-200 stroke-2 sm:w-5" />
          </span>
        )
      default:
        return (
          <span className="flex size-6 items-center justify-center rounded-xl bg-blue-600 sm:size-8">
            <Info className="h-auto w-4 text-white sm:w-6" />
          </span>
        )
    }
  }
  React.useEffect(() => {
    const handleAnimationEnd = () => {
      handleDel()
    }
    spanRef.current?.addEventListener("animationend", handleAnimationEnd)
    return () => {
      spanRef.current?.removeEventListener("animationend", handleAnimationEnd)
    }
  }, [spanRef])
  return (
    <m.div
      className={cn(toast({ variant, colors }))}
      role="alert"
      ref={ref}
      {...props}
      variants={animationVariants[animateEffect ?? "xMotion"] as Variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 200 }}
    >
      {getIcon()}
      <div className={cn("flex-1 overflow-hidden text-left text-xs font-normal sm:text-sm")}>
        <TypingContext.Provider value={{ typingStates, typingDispatch }}>
          {display === "writer" ? <Typing text={msg.split(".")} size={"md"} /> : msg}
        </TypingContext.Provider>
      </div>
      <ButtonWrapper
        size={"icon"}
        variant={"outline"}
        disabled={false}
        className={cn(xbtn({ variant, colors }), "size-6 border-0 outline-none")}
        onClick={delHandler}
        state={"prev"}
      >
        <span className="sr-only">Close</span>
        <XIcon className="h-3 sm:h-4" />
      </ButtonWrapper>
      {timed !== null && display === "standard" ? (
        <span
          className={cn(
            progress({ colors }),
            timed === "sm" ? "animate-longer-sm" : timed === "md" ? "animate-longer-md" : "animate-longer-lg"
          )}
          ref={spanRef}
        ></span>
      ) : null}
    </m.div>
  )
})
