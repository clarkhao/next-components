"use client"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Loader, X } from "lucide-react"
import React, { ButtonHTMLAttributes } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { twMerge } from "tailwind-merge"
import "../../styles/transition.css"

const button = cva(
  [
    "relative",
    "transition-all duration-150",
    "focus:outline-none outline-none",
    "rounded-full after:rounded-full",
    "flex justify-center items-center",
    "overflow-hidden",
    "ring-offset-light-background dark:ring-offset-dark-background",
  ],
  {
    variants: {
      intent: {
        primary: ["ring-light-primary-light-variant/70"],
        secondary: ["ring-light-secondary-light-variant/70"],
      },
      fill: {
        outlined: ["border", "border-2", "active:border", "active:ring-0"],
        contained: ["text-light-on-primary", "active:bg-white"],
      },
      size: {
        small: ["h-8", "text-xs", "font-medium", "px-4", "focus:ring-2 focus:ring-offset-1"],
        base: ["h-10", "text-sm", "font-medium", "px-6", "focus:ring-4 focus:ring-offset-1"],
        large: ["h-12", "px-8", "text-md", "font-medium", "focus:ring-4 focus:ring-offset-1"],
      },
      state: {
        pre: [],
        pending: [],
        success: [],
        fail: [],
      },
      disabled: {
        true: [],
        false: [],
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        fill: "contained",
        disabled: false,
        state: ["pre", "pending"],
        className: [
          "bg-light-primary hover:bg-light-primary-dark-variant active:bg-light-primary-dark-variant",
          "dark:bg-dark-primary-dark-variant dark:hover:bg-dark-primary-darker-variant dark:active:bg-dark-primary-darker-variant",
        ],
      },
      {
        intent: "primary",
        fill: "contained",
        disabled: false,
        state: "success",
        className: ["bg-light-success focus:ring-0 active:bg-light-success/80"],
      },
      {
        intent: "primary",
        fill: "contained",
        disabled: false,
        state: "fail",
        className: ["bg-light-error focus:ring-0 active:bg-light-error/80"],
      },
      {
        intent: "primary",
        fill: "contained",
        disabled: true,
        className: [
          "disabled:bg-light-primary-lighter-variant",
          "dark:disabled:bg-dark-primary-darker-variant/50 dark:disabled:text-gray-500",
        ],
      },
      {
        intent: "primary",
        fill: "outlined",
        disabled: false,
        state: ["pre", "pending"],
        className: [
          "text-light-primary border-light-primary after:bg-light-primary after:active:bg-light-primary-dark-variant",
          "dark:text-dark-primary dark:border-dark-primary dark:after:bg-dark-primary-dark-variant dark:hover:border-dark-primary-dark-variant dark:hover:text-dark-on-surface dark:after:active:bg-dark-primary-darker-variant dark:active:border-dark-primary-darker-variant",
        ],
      },
      {
        intent: "primary",
        fill: "outlined",
        disabled: false,
        state: "success",
        className: [
          "text-light-success border-light-success after:bg-light-success focus:ring-0 after:active:bg-light-success/80",
        ],
      },
      {
        intent: "primary",
        fill: "outlined",
        disabled: false,
        state: "fail",
        className: [
          "text-light-error border-light-error after:bg-light-error focus:ring-0 after:active:bg-light-error/80",
        ],
      },
      {
        intent: "primary",
        fill: "outlined",
        disabled: true,
        className: [
          "disabled:border-light-primary-lighter-variant disabled:text-light-primary-lighter-variant disabled:border",
          "dark:disabled:border-dark-primary-darker-variant/50 dark:disabled:text-gray-500",
        ],
      },
      {
        intent: "secondary",
        fill: "contained",
        disabled: false,
        state: ["pre", "pending"],
        className: [
          "bg-light-secondary hover:bg-light-secondary-dark-variant active:bg-light-secondary-dark-variant",
          "dark:bg-dark-secondary-dark-variant dark:hover:bg-dark-secondary-darker-variant dark:active:bg-dark-secondary-darker-variant",
        ],
      },
      {
        intent: "secondary",
        fill: "contained",
        disabled: false,
        state: "success",
        className: ["bg-light-success hover:bg-light-success focus:ring-0 active:bg-light-success/80"],
      },
      {
        intent: "secondary",
        fill: "contained",
        disabled: false,
        state: "fail",
        className: ["bg-light-error hover:bg-light-error focus:ring-0 active:bg-light-error/80"],
      },
      {
        intent: "secondary",
        fill: "contained",
        disabled: true,
        className: [
          "disabled:bg-light-secondary-lighter-variant",
          "dark:disabled:bg-dark-secondary-darker-variant/50 dark:disabled:text-gray-500",
        ],
      },
      {
        intent: "secondary",
        fill: "outlined",
        disabled: false,
        state: ["pre", "pending"],
        className: [
          "text-light-secondary border-light-secondary after:bg-light-secondary after:active:bg-light-secondary-dark-variant",
          "dark:text-dark-secondary dark:border-dark-secondary dark:after:bg-dark-secondary-dark-variant dark:hover:border-dark-secondary-dark-variant dark:hover:text-dark-on-surface dark:after:active:bg-dark-secondary-darker-variant dark:active:border-dark-secondary-darker-variant",
        ],
      },
      {
        intent: "secondary",
        fill: "outlined",
        disabled: false,
        state: "success",
        className: [
          "text-light-success border-light-success after:bg-light-success focus:ring-0 after:active:bg-light-success/80",
        ],
      },
      {
        intent: "secondary",
        fill: "outlined",
        disabled: false,
        state: "fail",
        className: [
          "text-light-error border-light-error after:bg-light-error focus:ring-0 after:active:bg-light-error/80",
        ],
      },
      {
        intent: "secondary",
        fill: "outlined",
        disabled: true,
        className: [
          "disabled:border-light-secondary-lighter-variant disabled:text-light-secondary-lighter-variant disabled:border",
          "dark:disabled:border-dark-secondary-darker-variant/50 dark:disabled:text-gray-500",
        ],
      },
      {
        intent: ["primary", "secondary"],
        fill: "outlined",
        disabled: false,
        className:
          "after:content-[''] after:absolute hover:text-dark-on-surface after:top-0 after:left-0 after:w-0 after:h-full after:transition-all after:ease-linear after:hover:w-full",
      },
    ],
    defaultVariants: {
      disabled: false,
      state: "pre",
      size: "base",
    },
  }
)

type TButton = {
  children: React.ReactNode
  withIcon?: boolean
  icon?: React.ReactNode
  /**
   * data-addToCart
   */
  addToCart?: string
}

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button> & TButton

export const Button = ({ intent, fill, size, state, disabled, children, withIcon = false, ...props }: TButtonProps) => {
  const child = (s: VariantProps<typeof button>["state"]) => {
    switch (s) {
      case "pre":
        return <>{withIcon ? props.icon : children}</>
      case "pending":
        return (
          <Loader
            className={"animate-spin"}
            style={{
              width: size !== "large" ? "12px" : "16px",
              height: "auto",
            }}
          />
        )
      case "success":
        return (
          <Check
            style={{
              width: size !== "large" ? "12px" : "16px",
              height: "auto",
            }}
          />
        )
      case "fail":
        return (
          <X
            style={{
              width: size !== "large" ? "12px" : "16px",
              height: "auto",
            }}
          />
        )
      default:
        return withIcon ? props.icon : children
    }
  }
  const btnRef = React.useRef<HTMLButtonElement>(null)
  /* Add a simple button ripple effect */
  React.useEffect(() => {
    const addRipple = () => {
      const ripple = document.createElement("span")
      ripple.className = twMerge(
        "absolute left-1/2 top-1/2 rounded-full -translate-x-1/2 -translate-y-1/2",
        "animate-ripple",
        `${
          state === "pre"
            ? intent === "primary"
              ? "bg-light-primary-light-variant"
              : "bg-light-secondary-light-variant"
            : ""
        }`
      )
      btnRef.current?.appendChild(ripple)
      setTimeout(() => ripple.remove(), 1000)
    }
    btnRef.current?.addEventListener("click", addRipple)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => btnRef.current?.removeEventListener("click", addRipple)
  }, [])
  return (
    <button
      {...props}
      className={twMerge(button({ intent, fill, size, disabled, state }), props.className)}
      disabled={disabled}
      ref={btnRef}
      data-addtocart={props.addToCart}
    >
      {withIcon ? (
        <span className="z-[2] inline-flex flex-row items-center justify-center gap-2 text-center">
          <SwitchTransition mode={"out-in"}>
            <CSSTransition key={state} timeout={{ exit: 150, enter: 150 }} classNames={"ymotion"}>
              <span className="inline-flex w-4 flex-row items-center justify-center">
                {!disabled ? child(state) : props.icon}
              </span>
            </CSSTransition>
          </SwitchTransition>
          {children}
        </span>
      ) : (
        <SwitchTransition mode={"out-in"}>
          <CSSTransition key={state} timeout={{ exit: 150, enter: 150 }} classNames={"ymotion"}>
            <div className="z-[2] inline-flex flex-row items-center justify-center gap-2 text-center">
              {!disabled ? child(state) : children}
            </div>
          </CSSTransition>
        </SwitchTransition>
      )}
    </button>
  )
}
