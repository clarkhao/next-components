"use client"
// One Time Passcode
import React, { ChangeEvent, Fragment, HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type TOtp = {
  size: number
  handleSet?: (value: string) => void
} & HTMLAttributes<HTMLInputElement>

export function OTP({ size, handleSet,...props }: TOtp) {
  const [focusIndex, setFocusIndex] = React.useState(0)
  const [values, setValues] = React.useState<Array<string>>(new Array(size).fill(""))
  const [isPressed, setPressed] = React.useState(false)

  const [err, setErr] = React.useState<Array<boolean>>(new Array(size).fill(false))
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([])

  const keys = "0123456789".split("")
  React.useEffect(() => {
    inputRefs.current[focusIndex]?.focus()
  }, [focusIndex, size])
  React.useEffect(() => {
    console.log(`values: ${values}`)
    let passed = true
    const errs = [...err]
    values.forEach((el, i) => {
      if (!el) {
        errs[i] = true
        passed = false
      } else {
        errs[i] = false
      }
    })
    setErr(errs)
    if (passed && handleSet) {
      handleSet(values.join(""))
    }
  }, [values])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    e.preventDefault()
    const arr = [...values]
    arr[i] = e.target.value
    if (!isPressed) {
      setValues(arr)
    }
  }

  const isMac = window.navigator.userAgent.includes("Mac")
  return (
    <div className={twMerge("flex flex-row items-center justify-center gap-x-1", "w-full")}>
      {new Array(size).fill(0).map((el, index) => {
        return (
          <Fragment key={`opt-${index}`}>
            <input
              {...props}
              className={twMerge(
                "min-w-[40px] rounded-lg text-center text-base ring-0 focus:ring focus:ring-ring py-2",
                "border outline-none focus:outline-none focus:ring-offset-1",
                "bg-background dark:bg-gray-700 dark:ring-offset-background"
              )}
              size={1}
              maxLength={1}
              ref={(reference) => (inputRefs.current[index] = reference)}
              value={values[index]}
              onChange={(e) => {
                handleChange(e, index)
              }}
              onKeyUp={async (e) => {
                if (e.key === "Backspace") {
                  if (!(e.target as HTMLInputElement).value) {
                    setFocusIndex(index - 1 < 0 ? 0 : index - 1)
                  }
                } else if (keys.includes(e.key)) {
                  if ((e.target as HTMLInputElement).value) {
                    setFocusIndex(index + 1 > size - 1 ? size - 1 : index + 1)
                  }
                }
              }}
              onKeyDown={async (e) => {
                if ((e.metaKey && e.key === "v" && isMac) || (e.ctrlKey && e.key === "v" && !isMac)) {
                  setPressed(true)
                  const clipboardData = await (await navigator.clipboard.readText()).trim()
                  console.log(`clipboardData: ${clipboardData}`)
                  const arr = [...values]
                  console.log(`arr: ${arr}`)
                  //here there's one error
                  const newValues = arr.slice(0, index).concat(clipboardData.split(""))
                  console.log(`newValues:${newValues}`)
                  setValues(newValues.slice(0, 6))

                  setFocusIndex((prev) =>
                    prev + clipboardData.length > size - 1 ? size - 1 : prev + clipboardData.length
                  )
                  setPressed(false)
                }
              }}
            />
          </Fragment>
        )
      })}
    </div>
  )
}
