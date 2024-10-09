import type { Meta, StoryObj } from "@storybook/react"
import { ToastQueue } from "./toastQueue"
import React from "react"
import { Provider } from "react-redux"
import { makeStore } from "../../store"
import { TToastMsg, TToastType } from "../../store/slices/toast"
import { nanoid } from "nanoid"
import { LoremIpsum } from "lorem-ipsum"
import { useDispatch } from "react-redux"
import { add } from "../../store/slices/toast"
import { ButtonWrapper } from "components/button/button_v2"

const Toast = () => {
  const dispatch = useDispatch()

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
    dispatch(add(newToast))
  }
  return (
    <>
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
      <ToastQueue pos={"top"} />
    </>
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

export const ToastQueueDefault: Story = {
  args: {},
  decorators: [
    (Story) => {
      return (
        <Provider store={makeStore()}>
          <Story />
        </Provider>
      )
    },
  ],
}
