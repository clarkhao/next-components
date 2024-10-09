import type { Meta, StoryObj } from "@storybook/react"
import { Recovery } from "./recovery"
import React from "react"

const meta: Meta<typeof Recovery> = {
  title: "UI/Error",
  component: Recovery,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    error: new Error("some error"),
    backPath: "Home"
  },
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
