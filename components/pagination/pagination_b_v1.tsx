import React from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { ListContext } from "./hook"
import "../../styles/transition.css"
import { ButtonWrapper } from "components/button/button_v2"
import { AnimatePresence, m, Variants } from "framer-motion"
import { animationVariants } from "lib/animate"
import { DynamicListContext } from "./dynamicHook"
export type TPagination = {
  /**
   * lastPageIndex
   */
  lastPageIndex: number
}
export default function Pagination(props: TPagination) {
  const list = React.useContext(ListContext)
  const firstIndex = list?.listState.pageIndex ?? 1
  const [isNext, setIsNext] = React.useState(true)

  const handleAsyncStateUpdate = async (next: boolean) => {
    return new Promise((resolve) => {
      setIsNext(next)
      resolve("finished")
    })
  }
  const handlePrev = async () => {
    const passed = firstIndex >= 2 && list?.listState.currentIndex !== props.lastPageIndex
    await handleAsyncStateUpdate(false)
    list?.listDispatch({
      type: "prev-page",
      payload: {
        first: passed,
        current: list.listState.currentIndex > 0,
      },
    })
  }
  const handleNext = async () => {
    await handleAsyncStateUpdate(true)
    list?.listDispatch({
      type: "next-page",
      payload: {
        first: props.lastPageIndex - firstIndex > 2 && list?.listState.currentIndex !== 1,
        current: props.lastPageIndex - list.listState.currentIndex > 0,
      },
    })
  }
  const handleSpecified = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const endPoints = [1, props.lastPageIndex]
    const target = e.target as HTMLButtonElement
    const value = target.textContent
    const isCurrent = value?.endsWith("(current)")
    const newValue = parseInt(value ?? "")
    await handleAsyncStateUpdate(newValue > (list?.listState.currentIndex ?? 1))
    list?.listDispatch({
      type: "specified-page",
      payload: {
        first: !isCurrent && !endPoints.some((val) => newValue === val),
        current: !isCurrent,
        value: newValue,
      },
    })
  }
  return (
    <>
      <nav aria-label="Page navigation example" className="w-full">
        <ul className="list-style-none flex w-full items-center justify-center">
          <li className="flex items-center justify-center">
            <ButtonWrapper
              variant={"ghost"}
              size={"sm"}
              className="relative w-20"
              onClick={handlePrev}
              disabled={list?.listState.currentIndex === 1}
              state={"prev"}
            >
              Previous
            </ButtonWrapper>
          </li>
          <AnimatePresence mode="popLayout" initial={false}>
            <m.li
              key={firstIndex}
              variants={animationVariants[isNext ? "xDecrease" : "xSubtractNoScale"] as Variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex size-10 items-center justify-center"
              aria-current={list?.listState.currentIndex === 1 ? "page" : undefined}
            >
              <ButtonWrapper
                variant={list?.listState.currentIndex === 1 ? "default" : "ghost"}
                size={"icon"}
                onClick={handleSpecified}
                state={"prev"}
              >
                {firstIndex}
                {list?.listState.currentIndex === 1 ? (
                  <>
                    <span className="absolute -m-px size-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                      (current)
                    </span>
                  </>
                ) : null}
              </ButtonWrapper>
            </m.li>
          </AnimatePresence>
          {/* this is the middle one */}
          <AnimatePresence mode="popLayout" initial={false}>
            <m.li
              key={firstIndex}
              variants={animationVariants[isNext ? "xAddNoScale" : "xSubtractNoScale"] as Variants}
              initial="initial"
              animate="animate"
              exit="exit"
              aria-current={
                list?.listState.currentIndex !== 1 && list?.listState.currentIndex !== props.lastPageIndex
                  ? "page"
                  : undefined
              }
              className="flex w-10 items-center justify-center"
            >
              <ButtonWrapper
                variant={
                  list?.listState.currentIndex !== 1 && list?.listState.currentIndex !== props.lastPageIndex
                    ? "default"
                    : "ghost"
                }
                size={"icon"}
                onClick={handleSpecified}
                state={"prev"}
              >
                {firstIndex + 1}
                {list?.listState.currentIndex !== 1 && list?.listState.currentIndex !== props.lastPageIndex ? (
                  <>
                    <span className="absolute -m-px size-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                      (current)
                    </span>
                  </>
                ) : null}
              </ButtonWrapper>
            </m.li>
          </AnimatePresence>
          <AnimatePresence mode="popLayout" initial={false}>
            <m.li
              key={firstIndex}
              variants={animationVariants[isNext ? "xAdd" : "xSubtractNoScale"] as Variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex size-10 items-center justify-center"
            >
              <ButtonWrapper
                variant={list?.listState.currentIndex === props.lastPageIndex ? "default" : "ghost"}
                size={"icon"}
                onClick={handleSpecified}
                state={"prev"}
              >
                {firstIndex + 2}
              </ButtonWrapper>
            </m.li>
          </AnimatePresence>
          <li className="flex items-center justify-center">
            <ButtonWrapper
              variant={"ghost"}
              size={"sm"}
              className="w-20"
              onClick={handleNext}
              disabled={list?.listState.currentIndex === props.lastPageIndex}
              state={"prev"}
            >
              Next
            </ButtonWrapper>
          </li>
        </ul>
      </nav>
    </>
  )
}
