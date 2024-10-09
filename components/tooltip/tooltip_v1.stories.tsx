import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip } from "./tooltip_v1"

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  args: {
    centered: false,
    isLeft: true,
    bgColor: "dark",
    pos: "top",
    tips: () => (
        <p
          className="flex h-6 w-[80px] items-center justify-center text-sm"
          
        >
          Hello World
        </p>
    ),
    children: <>Primary Base</>,
  },
  argTypes: {
    pos: {
      options: ["top", "bottom", "left", "right"],
      control: { type: "select" },
    },
    bgColor: {
      options: ["default", "blue", "dark", "red", "green", "yellow", "indigo", "purple", "pink"],
      control: { type: "select" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
