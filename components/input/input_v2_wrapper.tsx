"use client"
import React from "react"
import { Input, TInputProps } from "./input_v2"
import { getErrMsg, validatePassword } from "./v2/errors"

export const InputWrapper = React.forwardRef<HTMLLabelElement, TInputProps>(({ ...props }, ref) => {
  const inputID = React.useId()
  const [errMsg, setErrMsg] = React.useState<string | undefined | null>(null)
  // available for password input
  const [isEyeOpen, setEyeToggle] = React.useState(false)
  const [value, setValue] = React.useState("")
  return (
    <Input
      {...props}
      ref={ref}
      id={inputID}
      onChange={(e) => {
        const validity = (e.target as HTMLInputElement).validity
        console.log(validity)
        const msg = getErrMsg(validity, props.config)
        setErrMsg(msg)
        setValue(e.target.value)
      }}
      errMsg={errMsg}
      eyeToggle={{ isEyeOpen, setEyeToggle }}
      pwdMessages={validatePassword(value)}
      value={value}
    />
  )
})
InputWrapper.displayName = "InputWrapper"
