import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { InputWrapper } from "./input_v2_wrapper"

const meta: Meta<typeof InputWrapper> = {
  title: "UI/Input",
  component: InputWrapper,
  parameters: {
    layout: "padded",
  },
  args: {
    labelText: "Password",
    config: "password",
    variant: "standard",
    height: "md",
    isLeftIcon: false,
  },
  argTypes: {
    variant: {
      options: ["standard", "outlined", "filled"],
      control: { type: "radio" },
    },
    height: {
      options: ["xs", "sm", "md"],
      control: { type: "radio" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const InputV2Default: Story = {
  decorators: [
    (Story) => {
      return (
          <div className="flex max-w-[400px] flex-col items-center justify-center">
            <Story />
          </div>
      )
    },
  ],
}
