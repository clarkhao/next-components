import { pixelArt } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { cva, type VariantProps } from "class-variance-authority"
import { User, UserRoundX } from "lucide-react"
import React, { HTMLAttributes } from "react"
import { useErrorBoundary } from "react-error-boundary"
import { cn } from "lib/utils"

const avatar = cva(
  [
    "cursor-pointer p-0",
    "text-secondary-foreground ring-offset-background ring-offset-2 ring-ring",
    "focus:outline-none",
    "bg-secondary dark:bg-secondary",
  ],
  {
    variants: {
      outerSize: {
        xs: ["focus:ring-1 ", "flex justify-center items-center"],
        sm: ["focus:ring-2 ", "flex justify-center items-center"],
        md: ["focus:ring-2", "flex justify-center items-center"],
        lg: ["focus:ring-4", "flex justify-center items-center"],
        xl: ["focus:ring-4", "flex justify-center items-center"],
      },
      shape: {
        circular: ["rounded-full"],
        square: ["rounded-sm"],
      },
    },
    compoundVariants: [],
    defaultVariants: {
      outerSize: undefined,
      shape: undefined,
    },
  }
)

type TAvatar = {
  isLocal: boolean
  name: string
  imageSrc?: string
}

export type IAvatar = TAvatar & VariantProps<typeof avatar> & HTMLAttributes<HTMLSpanElement>

export const CvaAvatar = React.forwardRef<HTMLSpanElement, IAvatar>(
  ({ outerSize, shape, isLocal, name, imageSrc, className, ...props }, ref) => {
    const { showBoundary } = useErrorBoundary()

    const iconSize = () => {
      switch (outerSize) {
        case "xs":
          return 24
        case "sm":
          return 32
        case "md":
          return 36
        case "lg":
          return 64
        case "xl":
          return 112
        default:
          return 32
      }
    }
    const pixel = createAvatar(pixelArt, {
      size: iconSize(),
      seed: name,
      //hair: ["long07"],
    })
    return (
      <>
        {isLocal ? (
          <span
            ref={ref}
            {...props}
            className={cn(avatar({ outerSize, shape }))}
            aria-describedby="avatar-icon"
            tabIndex={0}
          >
            <User size={iconSize()} className={className} />
            <p id="avatar-icon" className="sr-only">
              avatar icon for user
            </p>
          </span>
        ) : (
          <span
            ref={ref}
            {...props}
            className={cn(avatar({ outerSize, shape }), "bg-secondary")}
            aria-describedby="avatar-image"
            tabIndex={0}
          >
            <img
              className={cn("bg-secondary", shape === "circular" ? "rounded-full" : "", className)}
              src={imageSrc ?? pixel.toDataUri()}
              alt="Bordered avatar"
              onError={() => {
                showBoundary(new Error("cann't load avatar"))
              }}
              width={iconSize()}
              height={iconSize()}
            />
            <p id="avatar-image" className="sr-only">
              avatar image for user
            </p>
          </span>
        )}
      </>
    )
  }
)
CvaAvatar.displayName = "Avatar"

export const UnknownAvatar = React.forwardRef<HTMLSpanElement, Omit<IAvatar, "isLocal" | "imageSrc">>(
  ({ outerSize, shape, className, ...props }, ref) => {
    const iconSize = () => {
      switch (outerSize) {
        case "xs":
          return 24
        case "sm":
          return 32
        case "md":
          return 36
        case "lg":
          return 64
        case "xl":
          return 112
        default:
          return 32
      }
    }
    return (
      <span ref={ref} {...props} className={cn(avatar({ outerSize, shape }))} aria-describedby="avatar-question">
        <UserRoundX size={iconSize()} className={className} />
        <p id="avatar-question" className="sr-only">
          avatar image not available now
        </p>
      </span>
    )
  }
)
UnknownAvatar.displayName = "UnknownAvatar"
