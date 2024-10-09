"use client"
import { Check, Loader, X } from "lucide-react"
import React, { HTMLAttributes } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import "../../styles/transition.css"
import { cn } from "lib/utils"

type TIconState = {
  width: number
  state: "prev" | "pending" | "success" | "error"
  variant: "default" | "white"
  prevState?: React.ReactNode
  animateEffect?: "ymotion" | "scale"
} & HTMLAttributes<HTMLDivElement>

export function IconState({ state, width, prevState, animateEffect = "ymotion", variant, ...props }: TIconState) {
  const getChild = (s: string) => {
    switch (s) {
      case "prev":
        return prevState
      case "pending":
        return (
          <Loader
            className={cn(variant === "default" ? "text-foreground" : "text-white", "dark:spinner-glow animate-spin", "absolute inset-0 m-auto")}
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
              "dark:success-more-glow dark:hover:success-glow",
              "absolute inset-0 m-auto"
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
              "dark:error-more-glow dark:hover:error-glow cursor-pointer",
              "absolute inset-0 m-auto"
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
    <>
      <SwitchTransition mode={"out-in"}>
        <CSSTransition key={state} timeout={{ exit: 150, enter: 150 }} classNames={animateEffect}>
          {getChild(state)}
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}
