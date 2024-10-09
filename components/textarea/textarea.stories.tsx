import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "UI/TextArea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const TextAreaDefault: Story = {}
