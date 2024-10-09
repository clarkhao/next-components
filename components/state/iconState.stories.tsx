import type { Meta, StoryObj } from "@storybook/react"
import { IconState } from "./iconState"
import { cn } from "lib/utils"

const meta: Meta<typeof IconState> = {
  title: "UI/State",
  component: IconState,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    width: 32,
    state: "success",
    variant: "default",
    prevState: <p className={cn("dark:text-glow dark:text-dark-on-surface", "text-center")}>Hello</p>,
    animateEffect: "scale",
  },
  argTypes: {
    state: {
      options: ["prev", "pending", "success", "error"],
      control: { type: "radio" },
    },
    animateEffect: {
      options: ["scale", "ymotion"],
      control: { type: "radio" },
    },
    variant: {
      options: ["default", "white"],
      control: { type: "radio" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const StateDefault: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <span className="relative size-40 overflow-hidden flex items-center justify-center">
            <Story />
          </span>
        </div>
      )
    },
  ],
}
