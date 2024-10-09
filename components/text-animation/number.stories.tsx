import type { Meta, StoryObj } from "@storybook/react"
import { Number } from "./number"

const meta: Meta<typeof Number> = {
  title: "UI/Text-Animation",
  component: Number,
  parameters: {
    layout: "padded",
  },
  args: {
    start: 0.0,
    end: 1000.0,
    size: "lg",
  },
  argTypes: {
    size: {
      options: ["sm", "md", "lg"],
      control: {
        type: "radio",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Number>

export const NumberDefault: Story = {
  decorators: [],
}
