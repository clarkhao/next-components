import { ButtonWrapper } from "components/button/button_v2"
import { Chip } from "components/chip/chip"
import { Minus } from "lucide-react"
import React from "react"

type TTextItemAbbr = {
  id: number
  from: string
  children: React.ReactNode
}
export const TextItemAbbr = React.forwardRef<HTMLButtonElement, TTextItemAbbr>(
  ({ id, from, children, ...props }, ref) => {
    const colors: Array<
      "blue" | "dark" | "red" | "green" | "yellow" | "purple" | "indigo" | "pink" | null | undefined
    > = ["blue", "dark", "red", "green", "yellow", "purple", "indigo", "pink"]
    const color = colors[Math.floor(Math.random() * colors.length)]
    return (
      <div className="flex w-full flex-row items-center justify-between">
        <span className="flex flex-row items-center justify-start gap-6 pl-4">
          Page {id}
          {children}
        </span>
        <Minus className="h-auto w-10 cursor-pointer rounded-sm p-2 hover:bg-accent" />
      </div>
    )
  }
)
