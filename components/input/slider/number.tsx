import React from "react"
type TSliderNumber = {
  range: {
    min: number
    max: number
  }
  num: number
}
export function SliderNumber({ range, num = 0, ...props }: TSliderNumber) {
  const [number, setNumber] = React.useState(num)
  const [type, setType] = React.useState("range")
  const id = React.useId()
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  React.useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        console.log("enter")
        setType("range")
      }
    }
    inputRef.current?.addEventListener("keydown", handleEnter)
    return () => {
      inputRef.current?.removeEventListener("keydown", handleEnter)
    }
  }, [])
  return (
    <label htmlFor={id} className="relative flex w-full items-center justify-center">
      {type === "range" ? (
        <span className="pointer-events-none absolute inset-0 m-auto h-fit w-fit">{number}px</span>
      ) : null}
      <input
        ref={inputRef}
        type={type}
        id={id}
        className="h-10 w-full cursor-col-resize opacity-100"
        min={range.min}
        max={range.max}
        onChange={(e) => {
          e.preventDefault()
          console.log(e.target.value)
          const parsed = parseInt(e.target.value)
          if (isNaN(parsed)) {
            setNumber(0)
          } else if (parsed > range.max) {
            setNumber(range.max)
          } else {
            setNumber(parsed)
          }
        }}
        onDoubleClick={(e) => {
          e.preventDefault()
          setType("text")
        }}
        onBlur={() => {
          setType("range")
        }}
      />
    </label>
  )
}
