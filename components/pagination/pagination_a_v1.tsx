import React from "react"
import { DynamicListContext } from "./dynamicHook"
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { ButtonWrapper } from "components/button/button_v2"
import { AnimatePresence, m, Variants } from "framer-motion"
import { animationVariants } from "lib/animate"

export type TDynamicPagination = {
  /**
   * total?
   */
  total: number
  /**
   * use
   */
  use?: "page" | "counter"
  /**
   * min and max
   */
  range?: [number, number]
}
export function DynamicPagination({ total, use = "page", ...props }: TDynamicPagination) {
  const list = React.useContext(DynamicListContext)
  const [input, setInput] = React.useState(list?.listState.currentIndex.toString())
  const [toggle, setToggle] = React.useState(true)
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (!toggle && inputRef.current) {
      inputRef.current.focus()
    }
  }, [toggle])
  const handleAsyncNext = async () => {
    return new Promise((resolve) => {
      list?.listDispatch({ type: "isAscending", payload: undefined })
      resolve("finished")
    })
  }
  const handleAsyncPrev = async () => {
    return new Promise((resolve) => {
      list?.listDispatch({ type: "isDescending", payload: undefined })
      resolve("finished")
    })
  }
  const handlePrev = async () => {
    if (list?.listState.isAscending) await handleAsyncPrev()
    list?.listDispatch({ type: "prev-page", payload: (list?.listState.currentIndex ?? 0) > 1 })
  }
  const handleNext = async () => {
    if (!list?.listState.isAscending) await handleAsyncNext()
    list?.listDispatch({
      type: "next-page",
      payload: (list?.listState.currentIndex ?? Number.POSITIVE_INFINITY) < total,
    })
  }
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    // validate the value in range of total
    setInput(e.target.value)
  }
  const handleBlur = () => {
    const parsed = parseInt(input!)
    if (parsed > (props.range ? props.range[1] : total)) {
      list?.listDispatch({ type: "set-specified", payload: props.range ? props.range[1] : total })
    } else if (parsed < (props.range ? props.range[0] : 1)) {
      list?.listDispatch({ type: "set-specified", payload: props.range ? props.range[0] : 1 })
    } else {
      list?.listDispatch({ type: "set-specified", payload: parsed })
    }
    setToggle(true)
  }
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur()
    } else if (e.key === "Escape") {
      handleBlur()
    }
  }
  const handleSetCount = () => {
    setInput(list?.listState.currentIndex.toString())
    setToggle(false)
  }
  return (
    <div className="inline-flex items-center justify-center rounded text-black">
      <ButtonWrapper
        variant={"outline"}
        size={"icon"}
        className="size-8 rounded-l-sm border-r rtl:rotate-180"
        onClick={handlePrev}
        disabled={!((list?.listState.currentIndex ?? 0) > 1)}
        state={"prev"}
      >
        {use === "page" ? (
          <>
            <span className="sr-only">Prev Page</span>
            <ChevronLeft className="text-foreground" />
          </>
        ) : (
          <>
            <span className="sr-only">Minus One</span>
            <Minus className="text-foreground" />
          </>
        )}
      </ButtonWrapper>
      {toggle ? (
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={list?.listState.currentIndex}
            variants={animationVariants[list?.listState.isAscending ? "xDecrease" : "xIncrease"] as Variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={[
              "flex h-8 w-12 cursor-pointer items-center justify-center gap-0 overflow-hidden bg-transparent text-foreground",
              "hover:bg-accent hover:text-accent-foreground",
            ].join(" ")}
            onClick={handleSetCount}
          >
            <p>{list?.listState.currentIndex}</p>
          </m.span>
        </AnimatePresence>
      ) : (
        <input
          ref={inputRef}
          className="border-brand-secondary w-12 border px-0 py-2 focus:outline-none focus:ring-0"
          type="number"
          value={input}
          onBlur={handleBlur}
          onInput={handleInput}
          min={props.range ? props.range[0] : 1}
          max={props.range ? props.range[1] : total}
          onKeyDown={handleEnter}
        />
      )}
      <ButtonWrapper
        variant={"outline"}
        size={"icon"}
        className="size-8 rounded-l-sm border-r rtl:rotate-180"
        onClick={handleNext}
        disabled={!((list?.listState.currentIndex ?? Number.POSITIVE_INFINITY) < total)}
        state={"prev"}
      >
        {use === "page" ? (
          <>
            <span className="sr-only">Next Page</span>
            <ChevronRight className="text-foreground" />
          </>
        ) : (
          <>
            <span className="sr-only">Plus One</span>
            <Plus className="text-foreground" />
          </>
        )}
      </ButtonWrapper>
    </div>
  )
}
