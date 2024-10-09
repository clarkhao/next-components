import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  args: {
    shape: "square",
    height: "sm",
    text: "Hello World",
    disabled: true,
  },
  argTypes: {
    shape: {
      options: ["square", "text"],
      control: { type: "select" },
    },
    height: {
      options: ["sm", "md"],
      control: { type: "select" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
