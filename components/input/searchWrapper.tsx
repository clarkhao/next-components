import { Search } from "lucide-react"
import React from "react"
import { twMerge } from "tailwind-merge"
import { ButtonWrapper } from "components/button/button_v2"
import { Input, TInputProps } from "./input_v1"

type TSearch = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>
  disabled: boolean
} & TInputProps

export function SearchWrapper({ handleClick, ...props }: TSearch) {
  return (
    <div className={twMerge("relative w-full ", props.variant === "standard" ? "max-h-[60px]" : "max-h-14")}>
      <Input
        {...props}
        type="text"
        verify={false}
        labeltext={props.variant === "filled" ? props.labeltext : ""}
        className={props.height === "xs" ? "pr-12" : "pr-14"}
        disabled={props.disabled}
      />
      <ButtonWrapper
        size={"icon"}
        variant={"default"}
        disabled={props.disabled}
        className={twMerge(
          "absolute right-0 z-10 -ml-2 rounded-br-md rounded-tr-md",
          `${props.height === "md" ? "h-14 w-14" : props.height === "sm" ? "h-12 w-12" : "h-10 w-10"}`,
          "focus:ring-0",
          props.variant === "standard" ? "top-1" : "top-0"
        )}
        onClick={handleClick}
        state={"prev"}
      >
        <Search className="h-auto w-6" />
      </ButtonWrapper>
    </div>
  )
}
