import type { Meta, StoryObj } from "@storybook/react"
import { Stepper } from "./stepper"
import React from "react"

const meta: Meta<typeof Stepper> = {
  title: "UI/Stepper",
  component: Stepper,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    steps: [
      { step: "step one", err: null },
      { step: "step two", err: new Error("not OK") },
      { step: "step three", err: null },
      { step: "step four", err: null },
      { step: "step five", err: null },
    ],
    step: -1,
    size: "md",
  },
  argTypes: {
    size: {
      options: ["lg", "md", "sm"],
      control: { type: "radio" },
    },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

export const StepperDefault: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <Story />
        </div>
      )
    },
  ],
}
