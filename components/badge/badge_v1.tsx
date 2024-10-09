"use client"
import { cva, type VariantProps } from "class-variance-authority"
import { AnimatePresence, m, Variants } from "framer-motion"
import React from "react"
import { animationVariants } from "lib/animate"
import { cn } from "lib/utils"

export interface IBadge {
  children: React.ReactNode
  num: number | string
  className?: string
  description?: string
}

const badge = cva(["absolute top-0", "inline-flex items-center justify-center", "cursor-pointer"], {
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
interface IBadge {
  children: React.ReactNode
  num: number | string
  className?: string
  description?: string
  animateEffect?: "xMotion" | "yMotion" | "scale"
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TBadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge> & IBadge

export const Badge = React.forwardRef<HTMLDivElement, TBadgeProps>(
  ({ intent, isDot, isAnimated, children, className, description, animateEffect = "ymotion", ...props }, ref) => {
    return (
      <div ref={ref} {...props} className="relative w-fit">
        {children}
        {isDot ? (
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
        ) : props.num || (typeof props.num === "number" ? props.num > 0 : true) ? (
          <span
            className={cn(badge({ intent, isDot, isAnimated }), "z-10", className)}
            role="status"
            aria-label={description}
          >
            <span className="sr-only">{description}</span>
            <AnimatePresence mode="wait" initial={false}>
              <m.p
                key={props.num}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={animationVariants[animateEffect] as Variants}
                transition={{ duration: 0.15 }}
              >
                {(typeof props.num === "number" ? props.num >= 100 : false) ? "99+" : props.num}
              </m.p>
            </AnimatePresence>
          </span>
        ) : null}
      </div>
    )
  }
)
Badge.displayName = "Badge"
