"use client"
import { X } from "lucide-react"
import Link from "next/link"
import React from "react"
import { cn } from "lib/utils"
import { ButtonWrapper, ButtonWrapperProps } from "../button/button_v2"

type TAnnouncement = {
  animated: boolean
  text: string
  link: string
} & ButtonWrapperProps

export function Announcement({ animated = true, text, link, ...props }: TAnnouncement) {
  const divRef = React.useRef<HTMLDivElement>(null)
  const [w, setWidth] = React.useState(0)
  React.useEffect(() => {
    const handleResize = () => {
      const width = divRef.current?.clientWidth
      setWidth(width ?? 0)
      ;(divRef.current as HTMLElement).style.setProperty("--announcement-width", `${width}px`)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [animated])
  return (
    <article
      className={cn(
        "bg-announcement text-announcement-foreground flex items-center justify-between gap-4 px-4 py-2",
        "group overflow-hidden"
      )}
      ref={divRef}
    >
      <p
        className={cn(
          "group-hover:pause overflow-hidden text-left text-sm font-medium will-change-transform",
          `${animated ? (w <= 480 ? "animate-marquee-sm" : "animate-marquee-md") : ""}`
        )}
      >
        {text}{" "}
        <Link href={link} className="inline-block underline">
          Check out more!
        </Link>
      </p>
      <ButtonWrapper {...props} size={"icon"} variant="secondary" disabled={false} className={"size-7"} state={"prev"}>
        <X size={16}/>
      </ButtonWrapper>
    </article>
  )
}
