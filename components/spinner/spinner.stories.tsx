import type { Meta, StoryObj } from "@storybook/react"
import { Spinner } from "./spinner_pattern_a"

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    pattern: 1,
  },
  argTypes: {
    pattern: {
      options: [1, 2, 3, 4],
      control: { type: "radio" },
    },
  },
}
