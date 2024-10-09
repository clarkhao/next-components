import type { Meta, StoryObj } from "@storybook/react"
import { Typing } from "./typing"
import React from "react"
import { TypingContext, useTyping } from "./typingHook"

const TypingShow = () => {
  const { typingStates, typingDispatch } = useTyping()
  return (
    <TypingContext.Provider value={{ typingStates, typingDispatch }}>
      <Typing text={["Hello World", "I am Clark", "I am a Developer"]} size={"xl"} />
    </TypingContext.Provider>
  )
}

const meta: Meta<typeof TypingShow> = {
  title: "UI/Text-Animation",
  component: TypingShow,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof TypingShow>

export const TypingDefault: Story = {
  decorators: [],
}
