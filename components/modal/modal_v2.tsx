// by animate for more complex animations
import { useAnimate, usePresence } from "framer-motion"
import { X } from "lucide-react"
import React, { HTMLAttributes } from "react"
import { ButtonWrapper } from "components/button/button_v2"
import { Card } from "components/card/card"
import { cn } from "lib/utils"

type TModal = {
  isOpen: boolean
  handleSwitch: () => void
  children: React.ReactNode
  animateEffect?: "scale" | "yMotion" | "xMotion"
} & HTMLAttributes<HTMLDivElement>

export function Modal({ isOpen, handleSwitch, children, animateEffect, className, ...props }: TModal) {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()
  React.useEffect(() => {
    const modalEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSwitch()
      }
    }
    document.body.addEventListener("keydown", modalEscape)
    return () => {
      document.body.removeEventListener("keydown", modalEscape)
    }
  }, [handleSwitch])
  React.useEffect(() => {
    console.log(isPresent)
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(scope.current, { opacity: 1, y: 10 }, { duration: 0.1 })
        await animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.1, type: "spring", stiffness: 200 })
      }
      enterAnimation()
    } else {
      const exitAnimation = async () => {
        await animate(scope.current, { opacity: 0, y: 50 }, { duration: 0.15 })
        safeToRemove()
      }

      exitAnimation()
    }
  }, [isPresent])
  return (
    <div
      {...props}
      ref={scope}
      className={cn(
        "absolute inset-0 z-10 m-auto h-fit w-fit overflow-y-auto overflow-x-hidden p-2 rounded-md",
        "flex items-center justify-center",
        "bg-card shadow-md",
        className,
      )}
    >
      <ButtonWrapper
        className={cn("absolute right-1 top-1 outline-none")}
        variant={"ghost"}
        size={"icon"}
        onClick={handleSwitch}
        state={"prev"}
      >
        <X size={16} />
        <span className="sr-only">Close modal</span>
      </ButtonWrapper>
      <Card className="w-80 border-none shadow-none">{children}</Card>
    </div>
  )
}
