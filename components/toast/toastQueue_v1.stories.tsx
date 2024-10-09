import type { Meta, StoryObj } from "@storybook/react"
import { ToastQueue } from "./toastQueue_v1"
import React from "react"
import { nanoid } from "nanoid"
import { LoremIpsum } from "lorem-ipsum"
import { ButtonWrapper } from "components/button/button_v2"
import { GlobalContext, TToastMsg, TToastType, useGlobalStates } from "context/global"
import { domAnimation, LazyMotion } from "framer-motion"

const Toast = () => {
  const { states, dispatch } = useGlobalStates()

  const handleAddToast = () => {
    const colorsIndex = Math.round(Math.random() * 4)
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 2,
        min: 1,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    })
    const newToast: TToastMsg = {
      id: nanoid(),
      colors: (["info", "success", "error", "warning", "msg"] as Array<TToastType>)[colorsIndex] ?? "msg",
      msg: lorem.generateParagraphs(1),
      display: "standard",
      timed: "lg",
      variant: "colored",
    }
    dispatch({ type: "toast-add", payload: newToast })
  }
  return (
    <GlobalContext.Provider value={{ states, dispatch }}>
      <ButtonWrapper
        variant={"default"}
        disabled={false}
        size={"default"}
        state={"prev"}
        className="w-48"
        onClick={handleAddToast}
      >
        New Toast
      </ButtonWrapper>
      <ToastQueue pos={"right"} />
    </GlobalContext.Provider>
  )
}

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ToastQueueV1: Story = {
  args: {},
  decorators: [(Story) => {
    return <LazyMotion features={domAnimation}>
      <Story />
    </LazyMotion>
  }],
}
