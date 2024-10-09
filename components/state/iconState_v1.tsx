"use client"
import { AnimatePresence, HTMLMotionProps, m, Variants } from "framer-motion"
import { Check, Loader, X } from "lucide-react"
import React from "react"
import { animationVariants } from "lib/animate"
import { cn } from "lib/utils"

type TIconState = {
  width: number
  state: "prev" | "pending" | "success" | "error"
  variant: "default" | "white"
  prevState?: React.ReactNode
  animateEffect?: "xMotion" | "yMotion" | "scale"
} & HTMLMotionProps<"div">

export function IconState({ state, width, prevState, animateEffect = "yMotion", variant, ...props }: TIconState) {
  const getChild = (s: string) => {
    switch (s) {
      case "prev":
        return prevState
      case "pending":
        return (
          <Loader
            className={cn(variant === "default" ? "text-foreground" : "text-white", "dark:spinner-glow animate-spin")}
            strokeWidth={2}
            style={{
              width: `${width}px`,
              height: "auto",
            }}
          />
        )
      case "success":
        return (
          <Check
            className={cn(
              variant === "default" ? "text-green-600" : "text-white",
              "dark:success-more-glow dark:hover:success-glow"
            )}
            strokeWidth={2}
            style={{
              width: `${width}px`,
              height: "auto",
            }}
          />
        )
      case "error":
        return (
          <X
            className={cn(
              variant === "default" ? "text-destructive" : "text-white",
              "dark:error-more-glow dark:hover:error-glow cursor-pointer"
            )}
            strokeWidth={2}
            style={{
              width: `${width}px`,
              height: "auto",
            }}
          />
        )
      default:
        return prevState
    }
  }
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        {...props}
        key={state}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animationVariants[animateEffect] as Variants}
        transition={{ duration: 0.15 }}
        className={cn(
          "z-[2] w-full h-full inline-flex flex-row items-center justify-center gap-2 overflow-hidden text-center"
        )}
      >
        {getChild(state)}
      </m.div>
    </AnimatePresence>
  )
}
