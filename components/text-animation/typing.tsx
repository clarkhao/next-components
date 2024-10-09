import { cva, VariantProps } from "class-variance-authority"
import React from "react"
import { TypingContext } from "./typingHook"
import { twMerge } from "tailwind-merge"

const writer = cva("text-foreground", {
  variants: {
    size: {
      sm: ["text-sm after:-top-1"],
      md: ["text-base after:-top-1"],
      lg: ["text-3xl after:-top-2"],
      xl: ["text-4xl after:-top-2"],
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type TTyping = {
  /**
   * text
   */
  text: string[]
} & VariantProps<typeof writer>

export function Typing({ size, ...props }: TTyping) {
  const typing = React.useContext(TypingContext)
  const timer = React.useRef<number>(0)
  const counter = React.useRef<number>(0)
  const [index, setIndex] = React.useState<number>(0)
  //const topFrom = size === "xl" ? "after:top-[10px]" : size === "lg" ? "after:top-[8px]" : size === "md" ? "after:top-[6px]" : "after:top-[4px]"

  React.useEffect(() => {
    const setPushStateAsync = async (state: boolean) => {
      return new Promise((resolve) => {
        typing?.typingDispatch({
          type: "set-isPushed",
          payload: state,
        })
        resolve("OK")
      })
    }
    const timerPrint = async () => {
      timer.current = window.setInterval(async () => {
        if (typing?.typingStates.isPushed) {
          typing?.typingDispatch({
            type: "push-text",
            payload:
              counter.current >= (props.text[index] ?? []).length
                ? ""
                : (props.text[index] ?? [])[counter.current] ?? "",
          })
          counter.current++
        } else if (typing?.typingStates.isPushed === false) {
          typing?.typingDispatch({
            type: "pop-text",
            payload: counter.current--,
          })
        }
        if (counter.current <= 0) {
          await setPushStateAsync(true)
          if (index < props.text.length - 1) setIndex((prev) => prev + 1)
          else setIndex(0)
          counter.current = 0
          typing?.typingDispatch({
            type: "reset",
            payload: null,
          })
        } else if (counter.current >= (props.text[index] ?? []).length + 20) {
          await setPushStateAsync(false)
        }
      }, 100)
    }
    timerPrint()
    return () => {
      window.clearInterval(timer.current)
    }
  }, [index, props.text, typing, typing?.typingStates.isPushed])
  React.useEffect(() => {
    console.log(index)
  }, [index])
  return (
    <>
      <div
        className={twMerge(
          writer({ size }),
          "after:animate-cursor-shining relative after:absolute after:top-0 after:content-['\\_']",
        )}
      >
        {">" + typing?.typingStates.text}
      </div>
    </>
  )
}
