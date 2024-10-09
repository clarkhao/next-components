// alter the redux & react-transition-group
"use client"
import { cva, VariantProps } from "class-variance-authority"
import React, { createRef, Fragment, HTMLAttributes } from "react"
import { Toast } from "./toast"
import { twMerge } from "tailwind-merge"
import { GlobalContext, useGlobalStates } from "context/global"
import { AnimatePresence } from "framer-motion"

const toastQueue = cva(["fixed z-50", "flex flex-col gap-y-4"], {
  variants: {
    pos: {
      top: ["top-2 left-1/2 -translate-x-1/2"],
      bottom: ["bottom-2 left-1/2 -translate-x-1/2"],
      left: ["left-2 top-10"],
      right: ["right-2 top-10"],
    },
  },
  defaultVariants: {
    pos: "right",
  },
})

type TToastQueue = VariantProps<typeof toastQueue> & HTMLAttributes<HTMLDivElement>

export function ToastQueue({ pos }: TToastQueue) {
  const global = React.useContext(GlobalContext)
  return (
    <div className={twMerge(toastQueue({ pos }))}>
      <AnimatePresence initial={false}>
        {[...(global?.states.toastMsg ?? [])]
          .map((el) => {
            return { ...el, nodeRef: createRef<HTMLDivElement>() }
          })
          .map((el) => {
            return (
              <Fragment key={el.id}>
                <Toast
                  ref={el.nodeRef}
                  msg={el.msg}
                  timed={el.timed}
                  display={el.display}
                  colors={el.colors}
                  variant={el.variant}
                  handleDel={() => {
                    global?.dispatch({ type: "toast-del", payload: el.id })
                  }}
                  animateEffect="xMotion"
                />
              </Fragment>
            )
          })}
      </AnimatePresence>
    </div>
  )
}
