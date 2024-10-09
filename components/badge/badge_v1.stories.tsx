import type { Meta, StoryObj } from "@storybook/react"
import { domAnimation, LazyMotion } from "framer-motion"
import { Bell } from "lucide-react"
import { ButtonWrapper } from "components/button/button_v2"
import { Badge } from "./badge_v1"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
  },
  args: {
    intent: "primary",
    isDot: false,
    isAnimated: true,
    className: "right-0 top-0",
    children: (
      <ButtonWrapper size="icon" variant="secondary" disabled={false} state={"prev"} className="rounded-full">
        <Bell className="h-6" />
      </ButtonWrapper>
    ),
    num: 3,
    animateEffect: "scale",
  },
  argTypes: {
    isDot: {
      options: [true, false],
      control: { type: "boolean" },
    },
    isAnimated: {
      options: [true, false],
      control: { type: "boolean" },
    },
    intent: {
      options: ["primary", "secondary", "success", "error", "invalid"],
      control: { type: "select" },
    },
    animateEffect: {
      options: ["scale", "yMotion", "xMotion"],
      control: { type: "radio" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const badge_v1: Story = {
  decorators: [
    (Story) => {
      return (
        <LazyMotion features={domAnimation}>
          <Story />
        </LazyMotion>
      )
    },
  ],
}
