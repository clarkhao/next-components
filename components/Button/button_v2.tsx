import React from "react"
import { IconState } from "components/state/iconState_v1"
import { Button, ButtonProps } from "./button"

export interface ButtonWrapperProps extends ButtonProps {
  state: "prev" | "pending" | "success" | "error"
}

export const ButtonWrapper = React.forwardRef<HTMLButtonElement, ButtonWrapperProps>(
  ({ state, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        variant={state === "error" && props.variant === "default" ? "destructive" : props.variant}
      >
        <IconState
          width={20}
          prevState={children}
          state={state}
          variant={props.variant === "default" ? "white" : "default"}
        />
      </Button>
    )
  }
)

ButtonWrapper.displayName = "Button"
