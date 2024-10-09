import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff } from "lucide-react"
import React, { InputHTMLAttributes } from "react"
import { ButtonWrapper } from "components/button/button_v2"
import { InputIcon } from "components/icons/icons"
import { IconState } from "components/state/iconState"
import { cn } from "lib/utils"
import json from "../../data/input.json"
import { TPwdMessage } from "./v2/errors"
import { Tooltip } from "components/tooltip/tooltip_v1"
import { Chip } from "components/chip/chip"
import { RequirementList } from "./v2/pwdRequirement"

const input = cva(
  [
    "w-full text-base z-10",
    "appearance-none peer",
    "ring-ring focus:ring-0 focus:outline-none",
    "[&:not(:placeholder-shown):not(:focus):invalid]:border-2 [&:not(:placeholder-shown):not(:focus):invalid]:border-destructive [&:not(:placeholder-shown):not(:focus):invalid]:text-destructive",
  ],
  {
    variants: {
      variant: {
        standard: [
          "h-12 rounded-md border ring-offset-2 focus:ring-2 shadow-inner",
          "order-2",
          "bg-background text-foreground ",
          "dark:bg-gray-700 dark:border-gray-600  dark:ring-offset-background",
          "[&:valid]:ring-2",
        ],
        outlined: [
          "h-12 rounded-md bg-transparent placeholder-transparent",
          "text-foreground",
          "border focus:border-2 focus:border-primary ",
          "[&:valid]:border-2 [&:valid]:border-primary",
        ],
        filled: [
          "rounded-t-md h-12 pt-4 border-none focus:border-none focus:outline-none focus:ring-0 placeholder-transparent",
          "bg-gray-100 dark:bg-gray-500 dark:text-dark-on-surface",
        ],
      },
      height: {
        xs: ["h-10 px-2"],
        sm: ["h-12 px-2"],
        md: ["h-14 px-4"],
      },
      isLeftIcon: {
        true: ["px-8"],
        false: ["pr-8"],
      },
    },
    compoundVariants: [
      {
        variant: "filled",
        height: ["xs", "sm"],
        isLeftIcon: false,
        className: ["pl-4"],
      },
    ],
    defaultVariants: {
      variant: "standard",
      height: "md",
      isLeftIcon: true,
    },
  }
)
const label = cva(["font-normal z-20"], {
  variants: {
    variant: {
      standard: ["order-1 mb-1"],
      outlined: [
        "bg-background",
        "absolute left-4",
        "peer-focus:left-4 peer-focus:scale-75 peer-focus:px-1 peer-focus:origin-left peer-[&:not(:placeholder-shown)]:origin-left",
        "peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:left-4 peer-[&:not(:placeholder-shown)]:scale-75",
        "transition-all duration-150",
      ],
      filled: [
        "bg-transparent group",
        "absolute left-4",
        "peer-focus:top-1 peer-focus:scale-75 peer-focus:left-4 peer-focus:origin-left peer-[&:not(:placeholder-shown)]:origin-left",
        "peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:scale-75 peer-[&:not(:placeholder-shown)]:left-4",
        "transition-all duration-150",
      ],
    },
    height: {
      xs: ["text-sm"],
      sm: ["text-sm"],
      md: ["text-base"],
    },
    isLeftIcon: {
      true: [],
      false: [],
    },
  },
  compoundVariants: [
    /********************************* height ***********************************/
    {
      variant: "outlined",
      height: "md",
      isLeftIcon: [false],
      className: ["top-[calc(50%-12px)] peer-focus:top-[-12px] peer-[&:not(:placeholder-shown)]:top-[-12px]"],
    },
    {
      variant: "outlined",
      height: "md",
      isLeftIcon: [true],
      className: ["top-[calc(50%-12px)] peer-focus:top-[-12px] peer-[&:not(:placeholder-shown)]:top-[-12px]"],
    },
    {
      variant: "outlined",
      height: ["xs", "sm"],
      isLeftIcon: [true, false],
      className: ["top-[calc(50%-10px)] peer-focus:top-[-10px]", "peer-[&:not(:placeholder-shown)]:top-[-10px]"],
    },
    {
      variant: "outlined",
      height: ["md", "xs", "sm"],
      isLeftIcon: [true],
      className: ["left-8 peer-focus:left-8", "peer-[&:not(:placeholder-shown)]:left-8"],
    },
    {
      variant: "filled",
      height: ["md", "sm", "xs"],
      isLeftIcon: [true],
      className: ["left-8 peer-focus:left-8 peer-[&:not(:placeholder-shown)]:left-8"],
    },
    {
      variant: "filled",
      height: "md",
      isLeftIcon: [true, false],
      className: ["top-[calc(50%-12px)]"],
    },
    {
      variant: "filled",
      height: ["sm"],
      isLeftIcon: [true, false],
      className: ["top-[calc(50%-10px)] peer-focus:top-1 peer-[&:not(:placeholder-shown)]:top-1"],
    },
    {
      variant: "filled",
      height: ["xs"],
      isLeftIcon: [true, false],
      className: ["top-[calc(50%-10px)] peer-focus:top-0 peer-[&:not(:placeholder-shown)]:top-0"],
    },
  ],
  defaultVariants: {
    variant: "standard",
    height: "md",
    isLeftIcon: true,
  },
})
const icons = cva(["absolute w-fit px-2 z-20"], {
  variants: {
    variant: {
      standard: [],
      outlined: [],
      filled: [],
    },
    height: {
      xs: [],
      sm: [],
      md: [],
    },
  },
  compoundVariants: [
    {
      variant: "standard",
      height: "md",
      className: ["top-[calc(56px-8px)]"],
    },
    {
      variant: "standard",
      height: "sm",
      className: ["top-[calc(48px-8px)]"],
    },
    {
      variant: "standard",
      height: "xs",
      className: ["top-[calc(44px-8px)]"],
    },
    {
      variant: ["outlined", "filled"],
      height: "md",
      className: ["top-[calc(28px-8px)]"],
    },
    {
      variant: ["outlined", "filled"],
      height: "sm",
      className: ["top-[calc(24px-8px)]"],
    },
    {
      variant: ["outlined", "filled"],
      height: "xs",
      className: ["top-[calc(20px-8px)]"],
    },
  ],
  defaultVariants: {
    variant: "standard",
    height: "md",
  },
})
type TInput = {
  labelText: string
  // config as a key to seperate different input
  config: string
  errMsg?: string | null
  eyeToggle?: {
    isEyeOpen: boolean
    setEyeToggle: React.Dispatch<React.SetStateAction<boolean>>
  }
  pwdMessages?: Array<TPwdMessage>
}

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof input> & TInput

export const Input = React.forwardRef<HTMLLabelElement, TInputProps>(
  ({ id, variant, height, isLeftIcon, labelText, config, errMsg, eyeToggle, pwdMessages, ...props }, ref) => {
    const data = JSON.stringify(json)
    const configs = (JSON.parse(data) as { [key: string]: { [key: string]: string } })[config]
    const inputConfig = {
      ...props,
      ...configs,
      type: config === "password" ? (eyeToggle?.isEyeOpen ? "text" : "password") : configs!["type"],
    }
    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn(
          "relative flex w-full flex-col gap-0",
          "has-[:not(:placeholder-shown):not(:focus):invalid]:text-destructive",
          variant === "filled"
            ? "after:absolute after:bottom-0 after:left-0 after:z-30 after:h-[2px] after:w-0 after:border-0 after:transition-all after:content-['']"
                .concat(" after:has-[:focus]:h-[3px] after:has-[:not(:placeholder-shown)]:h-[3px] ")
                .concat(
                  "after:has-[:focus]:w-full after:has-[:not(:placeholder-shown):not(:focus):invalid]:w-full after:has-[:not(:placeholder-shown):not(:focus):valid]:w-full "
                )
                .concat(" after:bg-primary  after:has-[:not(:placeholder-shown):not(:focus):invalid]:bg-destructive")
                .concat(
                  height === "md"
                    ? " after:has-[:not(:placeholder-shown):not(:focus):invalid]:top-[53px]"
                    : height === "sm"
                    ? " after:has-[:not(:placeholder-shown):not(:focus):invalid]:top-[45px]"
                    : " after:has-[:not(:placeholder-shown):not(:focus):invalid]:top-[37px]"
                )
            : ""
        )}
      >
        <input {...inputConfig} id={id} className={cn(input({ variant, height, isLeftIcon }))} placeholder=" " />
        {/* label */}
        <span className={cn(label({ variant, height, isLeftIcon }))}>{labelText}</span>
        {/* left icon */}
        <span className={icons({ variant, height })}>{isLeftIcon && InputIcon(config, "h-auto w-4 stroke-2")}</span>
        {/* right state icon */}
        <span
          className={cn(
            icons({ variant, height }),
            "right-0 overflow-hidden",
            config === "password" ? "-translate-y-[12px]" : ""
          )}
        >
          {config !== "password" ? (
            <IconState
              width={20}
              state={errMsg === undefined ? "success" : "prev"}
              prevState={<></>}
              variant={"default"}
            />
          ) : (
            <ButtonWrapper
              size={"icon"}
              variant={"ghost"}
              disabled={false}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                eyeToggle?.setEyeToggle(!eyeToggle.isEyeOpen)
              }}
              className={cn("cursor-pointer rounded-full")}
              state={"prev"}
            >
              {eyeToggle?.isEyeOpen ? <Eye className="h-auto w-4" /> : <EyeOff className="h-auto w-4" />}
            </ButtonWrapper>
          )}
        </span>
        {/* validating message */}
        <span
          className={cn(
            "order-9 mt-1 hidden text-xs",
            "peer-[&:not(:placeholder-shown):not(:focus):invalid]:flex peer-[&:not(:placeholder-shown):not(:focus):invalid]:flex-row",
            "peer-[&:not(:placeholder-shown):not(:focus):invalid]:items-start peer-[&:not(:placeholder-shown):not(:focus):invalid]:justify-between"
          )}
        >
          {errMsg}
          {config === "password" ? (
            <Tooltip
              tips={() => <RequirementList data={pwdMessages ?? []} />}
              pos={"bottom"}
              bgColor={"dark"}
              isAuto={true}
              centered={false}
              isLeft={true}
              className="z-20"
            >
              {(errMsg?.length ?? 0) > 0 ? (
                <Chip actual={"Requirements..."} bgColor={"red"} size={"xs"} className="text-xs" readableLength={13} />
              ) : null}
            </Tooltip>
          ) : null}
        </span>
      </label>
    )
  }
)
Input.displayName = "Input"
