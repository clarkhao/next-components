import React, { HTMLAttributes } from "react"
import { ErrorBoundary, FallbackProps } from "react-error-boundary"
import { CvaAvatar, UnknownAvatar } from "./avatar_v1"

type TAvatarWrapper = {
  isLocal: boolean
  size: "xs" | "sm" | "md" | "lg" | "xl"
  shape: "circular" | "square"
  name: string
  imageSrc?: string
} & HTMLAttributes<HTMLSpanElement>

function CircularErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  console.log(error)
  return <UnknownAvatar onClick={resetErrorBoundary} outerSize={"md"} shape={"circular"} name="" />
}
function SquareErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  console.log(error)
  return <UnknownAvatar onClick={resetErrorBoundary} outerSize={"md"} shape={"square"} name="" />
}

export const AvatarWrapper = React.forwardRef<HTMLSpanElement, TAvatarWrapper>(
  ({ size, shape, isLocal, name, imageSrc, ...props }, ref) => {
    return shape === "circular" ? (
      <ErrorBoundary fallbackRender={CircularErrorFallback}>
        <CvaAvatar
          {...props}
          ref={ref}
          isLocal={isLocal}
          outerSize={size}
          shape={shape}
          imageSrc={imageSrc}
          name={name}
        />
      </ErrorBoundary>
    ) : (
      <ErrorBoundary fallbackRender={SquareErrorFallback}>
        <CvaAvatar
          {...props}
          ref={ref}
          isLocal={isLocal}
          outerSize={size}
          shape={shape}
          imageSrc={imageSrc}
          name={name}
        />
      </ErrorBoundary>
    )
  }
)
AvatarWrapper.displayName = "Avatar"
