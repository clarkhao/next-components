import type { Meta, StoryObj } from "@storybook/react"
import { domAnimation, LazyMotion } from "framer-motion"
import { IconState } from "./iconState_v1"

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
    prevState: <p className="dark:text-glow dark:text-dark-on-surface">Hello</p>,
    animateEffect: "scale",
  },
  argTypes: {
    state: {
      options: ["prev", "pending", "success", "error"],
      control: { type: "radio" },
    },
    animateEffect: {
      options: ["scale", "yMotion"],
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

export const StateV1: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <span className="flex size-40 items-center justify-center overflow-hidden">
            <LazyMotion features={domAnimation}>
              <Story />
            </LazyMotion>
          </span>
        </div>
      )
    },
  ],
}
