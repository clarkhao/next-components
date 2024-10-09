import type { Meta, StoryObj } from "@storybook/react"
import { SpinnerOverlay } from "./spinnerOverlay"

const meta: Meta<typeof SpinnerOverlay> = {
  title: "UI/Spinner",
  component: SpinnerOverlay,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Overlay: Story = {}
