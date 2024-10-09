import type { Meta, StoryObj } from "@storybook/react"
import { TextItemAbbr } from "./textItemAbbr"

const meta: Meta<typeof TextItemAbbr> = {
  title: "UI/Draggable",
  component: TextItemAbbr,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    id: 1
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const TextAreaAbbr: Story = {}
