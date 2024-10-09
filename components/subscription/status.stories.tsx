import type { Meta, StoryObj } from "@storybook/react"
import { SubscriptionStatus } from "./status"

const meta: Meta<typeof SubscriptionStatus> = {
  title: "UI/Subscription",
  component: SubscriptionStatus,
  parameters: {
    layout: "centered",
  },
  args: {
    plan: "free",
    messages: [
      { free: "Unlock More Features!", starter: "Go Pro and Maximize Your Productivity!" },
      { free: "Get the most out of", starter: "Upgrade to Pro for the Ultimate Experience" },
      { free: "Limited Time Offer", starter: "Power Up Your Workflow" },
    ],
  },
  argTypes: {
    plan: {
      options: ["free", "start", "pro"],
      control: { type: "radio" },
    },
  },
}

export default meta
type Story = StoryObj<typeof Number>

export const StatusDefault: Story = {}
