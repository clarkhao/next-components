import { IconState } from "../state/iconState"
import { OlHTMLAttributes } from "react"
import { cn } from "lib/utils"
import { ButtonWrapper } from "components/button/button_v2"

type TStepper = {
  step: number
  steps: Array<{ step: string; err: Error | null }>
  size: "sm" | "md" | "lg"
} & OlHTMLAttributes<HTMLOListElement>

export function Stepper({ size, step, ...props }: TStepper) {
  return (
    <div className="w-full">
      {/* container with responsive design */}
      <h2 className="sr-only">Steps</h2>
      <ol
        className={cn(
          "font-medium text-gray-500 dark:text-gray-300",
          `${size === "md" ? "text-base" : size === "sm" ? "text-sm" : "text-lg"}`,
          props.className
        )}
        style={{ display: "grid", gridTemplateColumns: `repeat(${props.steps.length}, minmax(0, 1fr))` }}
      >
        {props.steps.map((el, index) => {
          return (
            <li
              key={`step-${index}`}
              className={cn(
                "relative flex flex-col items-center justify-start gap-2",
                "transition-colors duration-300 ease-in-out",
                `${index === step ? "text-primary-foreground" : ""}`
              )}
            >
              {/* step number */}
              <span className={cn("hidden min-[400px]:block", index === step ? "text-primary" : "text-foreground")}>
                {el.step}
              </span>
              {/* icon state */}
              <ButtonWrapper
                variant={index > step ? "outline" : index === step ? "secondary" : "default"}
                size={"icon"}
                className={cn(
                  `${size === "sm" ? "h-[22px] w-[22px]" : size === "md" ? "h-[26px] w-[26px]" : "h-[30px] w-[30px]"}`
                )}
                state={index >= step ? "prev" : el.err === null ? "success" : "error"}
              >
                {index + 1}
              </ButtonWrapper>
              {/* progress bar with gray original and green before */}
              {index === props.steps.length - 1 ? null : (
                <span
                  className={cn(
                    "absolute z-[-1] h-1 w-[100%] bg-gray-300",
                    `${
                      size === "sm"
                        ? "bottom-2 translate-x-3"
                        : size === "md"
                        ? "bottom-2.5 translate-x-3.5"
                        : "bottom-3 translate-x-4"
                    }`,
                    " left-[calc(50%-7px)]",
                    "before:absolute before:h-1 before:w-0 before:bg-primary before:content-['']",
                    "before:transition-all before:duration-300 before:ease-in-out",
                    `${step > index ? "before:w-full" : ""}`
                  )}
                ></span>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
