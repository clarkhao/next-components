// by motion for simple animations
import { HTMLMotionProps, m, Variants } from "framer-motion"
import { X } from "lucide-react"
import React from "react"
import { ButtonWrapper } from "components/button/button_v2"
import { Card } from "components/card/card"
import { animationVariants } from "lib/animate"
import { cn } from "lib/utils"

type TModal = {
  isOpen: boolean
  handleSwitch: () => void
  children: React.ReactNode
  animateEffect?: "scale" | "yMotion" | "xMotion"
} & HTMLMotionProps<"div">

export function Modal({ isOpen, handleSwitch, children, animateEffect, className, ...props }: TModal) {
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
  return (
    <m.div
      {...props}
      variants={animationVariants[animateEffect ?? "scale"] as Variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 200 }}
      className={cn(
        "absolute inset-0 z-10 m-auto h-fit w-fit overflow-y-auto overflow-x-hidden rounded-md p-2",
        "flex items-center justify-center",
        "bg-card shadow-md",
        className
      )}
    >
      <ButtonWrapper
        className={cn("absolute right-1 top-1 outline-none")}
        variant={"ghost"}
        size={"icon"}
        onClick={handleSwitch}
        state={"prev"}
        animated={false}
      >
        <X size={16} />
        <span className="sr-only">Close modal</span>
      </ButtonWrapper>
      <Card className="w-80 border-none shadow-none">{children}</Card>
    </m.div>
  )
}
