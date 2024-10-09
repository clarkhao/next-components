import type { Meta, StoryObj } from "@storybook/react"
import { twMerge } from "tailwind-merge"
import { ButtonWrapper } from "./button_v2"

const meta: Meta<typeof ButtonWrapper> = {
  title: "UI/Button",
  component: ButtonWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  args: {
    variant: "default",
    size: "default",
    asChild: false,
    state: "prev",
    disabled: false,
    children: "Hello",
    className: twMerge("flex justify-center items-center gap-4")
  },
  argTypes: {
    variant: {
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      control: { type: "select" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: { type: "select" },
    },
    state: {
      options: ["prev", "pending", "success", "error"],
      control: { type: "select" },
    },
    disabled: {
      options: [true, false],
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ButtonV2: Story = {}
