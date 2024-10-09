import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { SliderNumber } from "./number"

const meta: Meta<typeof SliderNumber> = {
  title: "UI/Input",
  component: SliderNumber,
  parameters: {
    layout: "padded",
  },
  args: {
    range: {
      min: 0,
      max: 1080
    },
    num: 100,
  },
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const SliderNumberDefault: Story = {
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
