"use client"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import "../../styles/transition.css"
import { cn } from "lib/utils"

const badge = cva(["absolute", "inline-flex", "items-center", "justify-center", "top-0"], {
  variants: {
    intent: {
      primary: ["bg-primary", "text-primary-foreground"],
      secondary: ["bg-secondary", "text-secondary-foreground"],
      success: ["bg-primary", "text-primary-foreground"],
      error: ["bg-destructive", "text-destructive-foreground"],
      invalid: ["bg-muted", "animate-none", "text-muted-foreground"],
    },
    isDot: {
      true: ["rounded-full", "border-none", "right-0", "h-3", "min-w-[12px]"],
      false: [
        "px-1",
        "h-6",
        "min-w-[20px]",
        "text-xs",
        "font-bold",
        "border-border border-2",
        "rounded-[24px]",
        "-right-2 -top-1",
        "overflow-hidden",
      ],
    },
    isAnimated: {
      true: ["animate-bounce"],
      false: ["animate-none"],
    },
  },
  compoundVariants: [],
  defaultVariants: {
    intent: "primary",
    isDot: false,
    isAnimated: false,
  },
})

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface IBadge {
  children: React.ReactNode
  num: number | string
  className?: string
  description?: string
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TBadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge> & IBadge

export const Badge = React.forwardRef<HTMLSpanElement, TBadgeProps>(
  ({ intent, isDot, isAnimated, children, className, description, ...props }, ref) => {
    return (
      <div className="relative w-fit">
        {children}
        {isDot ? (
          <>
            <span
              ref={ref}
              {...props}
              className={cn(badge({ intent, isDot: true, isAnimated }), className)}
              role="status"
              aria-label={description}
            >
              <span
                className={cn(
                  "absolute -z-10 h-full w-full animate-ping rounded-full opacity-75",
                  `${
                    intent === "primary"
                      ? "bg-primary"
                      : intent === "success"
                      ? "bg-announcement"
                      : intent === "error"
                      ? "bg-destructive"
                      : intent === "secondary"
                      ? "bg-secondary"
                      : ""
                  }`
                )}
              ></span>
              <span className="sr-only">{description}</span>
            </span>
          </>
        ) : props.num || (typeof props.num === "number" ? props.num > 0 : true) ? (
          <span
            ref={ref}
            {...props}
            className={cn(badge({ intent, isDot, isAnimated }), "z-10", className)}
            role="status"
            aria-label={description}
          >
            <span className="sr-only">{description}</span>
            <SwitchTransition mode="out-in">
              <CSSTransition key={props.num} classNames="ymotion" timeout={150}>
                <p>{(typeof props.num === "number" ? props.num >= 100 : false) ? "99+" : props.num}</p>
              </CSSTransition>
            </SwitchTransition>
          </span>
        ) : null}
      </div>
    )
  }
)
Badge.displayName = "Badge"
