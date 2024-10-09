import type { Meta, StoryObj } from "@storybook/react"
import { TextItem } from "./textItem"

const meta: Meta<typeof TextItem> = {
  title: "UI/Draggable",
  component: TextItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const TextAreaItem: Story = {}
