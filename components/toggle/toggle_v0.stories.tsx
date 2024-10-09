import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle_v0"

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  parameters: {
    layout: "padded",
  },
  args: {
    text: ["off", "on"],
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ToggleDefault: Story = {}
