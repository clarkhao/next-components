import type { Meta, StoryObj } from "@storybook/react"
import { ComboboxDemo } from "./combobox"

const meta: Meta<typeof ComboboxDemo> = {
  title: "UI/Select",
  component: ComboboxDemo,
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Combobox: Story = {}
