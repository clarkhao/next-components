import type { Meta, StoryObj } from "@storybook/react"
import { Chip } from "./chip_v1"

const meta: Meta<typeof Chip> = {
  title: "UI/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
  },
  args: {
    actual: "Learn More...",
    removable: false,
    selectable: false,
    readableLength: 10,
    bgColor: "blue",
    btnColor: "blue",
    size: "xs",
    children: null,
  },
  argTypes: {
    removable: {
      options: [true, false],
      control: { type: "boolean" },
    },
    selectable: {
      options: [true, false],
      control: { type: "boolean" },
    },
    bgColor: {
      options: ["blue", "dark", "red", "green", "yellow", "indigo", "purple", "pink"],
      control: { type: "select" },
    },
    btnColor: {
      options: ["blue", "dark", "red", "green", "yellow", "indigo", "purple", "pink"],
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm"],
      control: { type: "select" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ChipV1: Story = {}
