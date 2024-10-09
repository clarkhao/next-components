import React, { TextareaHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type TTextArea = {
  pos: number[]
  textSize: number
  isMoving?: boolean
  isOutlined?: boolean
  dataID?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextArea({ isOutlined = false, pos, dataID = "", textSize, isMoving, ...props }: TTextArea) {
  const ref = React.useRef<HTMLTextAreaElement>(null)
  React.useEffect(() => {
    const autosize = () => {
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.height = "auto"
          ref.current.style.height = ref.current.scrollHeight + "px"
        }
      }, 0)
    }
    ref.current?.addEventListener("keydown", autosize)
    return () => {
      ref.current?.removeEventListener("keydown", autosize)
    }
  }, [ref, textSize, isMoving])

  return (
    <textarea
      {...props}
      rows={1}
      ref={ref}
      className={twMerge(
        "resize-none overflow-hidden bg-secondary text-secondary-foreground",
        "break-words font-[Inter] font-[400] tracking-normal",
        isOutlined
          ? "m-0 block p-0 border-accent border"
          : "absolute m-0 border-none bg-none p-0 text-left leading-none outline-none focus:ring-0",
        "origin-top-left translate-y-0"
      )}
      data-textarea={dataID}
      style={{
        fontSize: `${textSize}px`,
        left: pos[0],
        top: pos[1],
        display: isMoving ? "none" : "block",
        height: `${textSize}px`,
        width: "200px",
      }}
    />
  )
}
