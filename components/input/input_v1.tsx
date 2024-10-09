"use client"
import { cva, type VariantProps } from "class-variance-authority"
import { Eye, EyeOff } from "lucide-react"
import React, { InputHTMLAttributes, useId } from "react"
import { useDispatch, useSelector } from "react-redux"
import { twMerge } from "tailwind-merge"
//hooks
import { ButtonWrapper } from "components/button/button_v2"
import { CompareList } from "./cva/compare"
import { TValue, useInput } from "./cva/hook"
import { PswStepper } from "./cva/pswStepper"
import { RootState } from "../../store"
import { toggleType } from "../../store/slices/auth"
import { del } from "../../store/slices/error"
import { Chip } from "../chip/chip"
import { IconState } from "../state/iconState"
import { Tooltip } from "../tooltip/tooltip_v1"

const input = cva(
  ["w-full text-base", "appearance-none", "ring-ring focus:ring-0 focus:outline-none focus:ring-ring"],
  {
    variants: {
      variant: {
        standard: [
          "w-full h-12 rounded-md border ring-offset-2 focus:ring-2 shadow-inner",
          "bg-background text-foreground ",
          "dark:bg-gray-700 dark:border-gray-600  dark:ring-offset-background",
        ],
        outlined: [
          "h-12 rounded-md bg-transparent placeholder-transparent",
          "text-foreground",
          "border focus:border-2 focus:border-primary",
          "peer",
        ],
        filled: [
          "rounded-t-md h-12 pt-5",
          "border-none focus:border-none focus:outline-none focus:ring-0  placeholder-transparent ",
          "bg-gray-100 dark:bg-gray-500 dark:text-dark-on-surface",
          "peer",
        ],
      },
      height: {
        xs: ["h-10"],
        sm: ["h-12"],
        md: ["h-14"],
      },
      disabled: {
        true: ["text-muted-foreground border-muted bg-muted/30 cursor-not-allowed"],
        false: [],
      },
    },
    compoundVariants: [
      /********************************* height ***********************************/
      {
        variant: "filled",
        height: "md",
        className: ["pt-6"],
      },
    ],
    defaultVariants: {
      height: "md",
      variant: "outlined",
      disabled: false,
    },
  }
)

type TInput = {
  labeltext: string
  value?: TValue
  reqerr?: string
  verify?: boolean
  lefticon?: React.ReactNode
  name: string
  handleset?: (value: string) => void
}

export type TInputProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof input> & TInput

export const Input = ({ variant, height, value, disabled, verify, handleset, ...props }: TInputProps) => {
  const inputId = useId()
  const { inputState, inputDispatch } = useInput(value, props.reqerr, props.name, verify)
  const dispatch = useDispatch()
  const fields = useSelector((state: RootState) => state.auth.fields)
  const inputRef = React.useRef<HTMLInputElement>(null)
  /************************************************************************/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (handleset) {
      handleset(e.target.value)
    }
    inputDispatch({ type: "set-value", payload: e.target.value })
  }
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    inputDispatch({ type: "set-blur", payload: false })
    if (props.onFocus) props.onFocus(e)
  }
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    inputDispatch({ type: "set-blur", payload: true })
    if (props.onBlur) props.onBlur(e)
  }
  /**************************************************************************/
  return (
    <div
      className={twMerge(
        "flex w-full min-w-[360px] flex-col items-start justify-start",
        `${height === "md" ? "min-h-[72px]" : height === "sm" ? "min-h-16" : "min-h-14"}`
      )}
    >
      {/* input box */}
      <div
        className={twMerge(
          "relative flex w-full min-w-[360px] items-start justify-start",
          `${variant !== "standard" ? "flex-col" : "flex-col-reverse"}`
        )}
      >
        <input
          {...props}
          id={inputId}
          ref={inputRef}
          className={twMerge(
            input({ variant, height, disabled }),
            `${
              //error style
              inputState.error.length > 0 || inputState.requestErr
                ? "border-destructive focus:border-destructive focus:ring-destructive"
                : ""
            }`,
            `${props.lefticon ? "px-8" : "pl-3"}`, //if there's a icon at left
            `${verify ? "pr-10" : "pr-3"}`,
            props.className
          )}
          placeholder={""}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          value={value ?? inputState.inputValue}
          disabled={disabled}
        />
        {/* label of input */}
        <label
          htmlFor={inputId}
          className={twMerge(
            "font-normal text-foreground",
            `${
              variant !== "standard"
                ? (variant === "outlined"
                    ? [
                        "bg-background",
                        "peer-focus:left-[10px] peer-focus:top-0 peer-focus:scale-75 peer-focus:px-1",
                        "peer-[&:not(:placeholder-shown)]:left-[10px] peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:scale-75 peer-[&:not(:placeholder-shown)]:px-1",
                      ].join(" ")
                    : "bg-transparent"
                        .concat(" peer-focus:left-8 peer-focus:scale-75")
                        .concat(
                          `${
                            height === "xs"
                              ? "  peer-focus:top-2 peer-[&:not(:placeholder-shown)]:top-2"
                              : " peer-focus:top-4 peer-[&:not(:placeholder-shown)]:top-4"
                          }`
                        )
                        .concat(" peer-[&:not(:placeholder-shown)]:left-8 peer-[&:not(:placeholder-shown)]:scale-75")
                        .concat(`${props.lefticon ? "" : " peer-focus:left-3 peer-[&:not(:placeholder-shown)]:left-3"}`)
                  ).concat(" absolute top-1/2 z-10 origin-[0] -translate-y-1/2 cursor-text font-normal duration-300")
                : ["pb-1 pl-0"]
            }`,

            `${height === "xs" ? "left-8 text-sm" : "left-10"}`,
            `${disabled ? "border-muted text-muted" : ""}`,
            `${
              //error style
              inputState.error.length > 0 || inputState.requestErr ? "text-destructive" : ""
            }`,
            `${props.lefticon ? "" : "left-3"}`
          )}
        >
          {props.labeltext}
        </label>
        {/* left icon */}
        {props.lefticon ? (
          <span
            className={twMerge(
              "absolute left-3 z-20 flex justify-center text-foreground",
              `${variant !== "standard" ? "top-1/2 -translate-y-1/2" : height === "xs" ? "top-[24px]" : "top-[28px]"}`,
              `${height === "md" ? "h-14" : height === "sm" ? "h-12" : "h-10"}`,
              `${disabled ? "border-muted text-muted" : ""}`
            )}
            onClick={() => inputRef.current?.focus()}
          >
            {props.lefticon}
          </span>
        ) : null}
        {/* right icon of states */}
        {inputState.inputValue ? (
          <span
            className={twMerge(
              "absolute right-0 w-10 overflow-hidden",
              `${variant !== "standard" ? "top-0 h-full" : height === "xs" ? "top-[24px]" : "top-[28px]"}`,
              `${height === "md" ? "h-14" : height === "sm" ? "h-12" : "h-10"}`
            )}
          >
            {props.name !== "password" ? (
              <IconState
                width={20}
                state={inputState.result as "error" | "success" | "prev"}
                prevState={<></>}
                onClick={() => {
                  if (inputState.result === "error") {
                    dispatch(del(props.name ?? "name"))
                    if (handleset) handleset("")
                    inputDispatch({ type: "set-value", payload: "" })
                  }
                }}
                variant={"default"}
              />
            ) : (
              <ButtonWrapper
                size={"icon"}
                variant={"ghost"}
                disabled={false}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  dispatch(toggleType())
                }}
                className={twMerge("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", "cursor-pointer")}
                state={"prev"}
              >
                {fields["type"] === "password" ? <EyeOff className="h-auto w-4 " /> : <Eye className="h-auto w-4 " />}
              </ButtonWrapper>
            )}
          </span>
        ) : null}
        {/* when variant is filled, this is the progress bar */}
        {variant === "filled" ? (
          <div
            className={twMerge(
              "absolute bottom-0 left-0 z-10 h-[2px] w-0 border-0 transition-all ".concat(
                "peer-focus:h-[3px] peer-focus:w-full peer-[&:not(:placeholder-shown)]:h-[3px] peer-[&:not(:placeholder-shown)]:w-full"
              ),
              `${inputState.error.length > 0 || inputState.requestErr ? "bg-destructive" : "bg-primary"}`
            )}
          ></div>
        ) : null}
      </div>
      {/* validation message */}
      <div
        className={twMerge(
          "text-xs italic text-destructive",
          "relative z-20 flex w-full h-4 translate-y-1 flex-row items-center justify-between"
        )}
      >
        {inputState.error.length > 0 || inputState.requestErr || props.name === "password" ? (
          <>
            {props.name === "password" && verify ? (
              <PswStepper length={inputState.inputValue?.toString().length ?? 0} data={inputState.compare} />
            ) : (
              <p>{inputState.requestErr ?? inputState.error[0]}</p>
            )}
            {inputState.error.length > 1 ||
            (inputState.compare.some((el) => el.value === true || el.value === undefined) &&
              props.name === "password") ? (
              <Tooltip
                tips={() => <CompareList data={inputState.compare} />}
                pos={"bottom"}
                bgColor={"dark"}
                isAuto={true}
                centered={false}
                isLeft={true}
                className="z-20"
              >
                {inputState.compare.length > 0 && !inputState.requestErr ? (
                  <Chip actual={"Learn More..."} bgColor={"red"} size={"xs"} className="text-xs" />
                ) : null}
              </Tooltip>
            ) : null}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
