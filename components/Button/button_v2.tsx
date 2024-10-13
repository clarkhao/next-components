import React from "react"
import { IconState } from "components/state/iconState_v1"
import { Button, ButtonProps } from "./button"

export interface ButtonWrapperProps extends ButtonProps {
  state?: "prev" | "pending" | "success" | "error"
  animated?: boolean
}

export const ButtonWrapper = React.forwardRef<HTMLButtonElement, ButtonWrapperProps>(
  ({ state="prev", animated, children=false, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        variant={state === "error" && props.variant === "default" ? "destructive" : props.variant}
      >
        {animated ? (
          <IconState
            width={20}
            prevState={children}
            state={state}
            variant={props.variant === "default" ? "white" : "default"}
          />
        ) : (
          children
        )}
      </Button>
    )
  }
)

ButtonWrapper.displayName = "Button"
