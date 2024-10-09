import type { Meta, StoryObj } from "@storybook/react"
import { NavigationMenuDemo } from "./navigation"


const meta: Meta<typeof NavigationMenuDemo> = {
  title: "UI/Menu",
  component: NavigationMenuDemo,
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const NavigationMenuDefault: Story = {}