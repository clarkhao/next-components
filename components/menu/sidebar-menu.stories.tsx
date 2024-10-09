import type { Meta, StoryObj } from "@storybook/react"
import { SidebarMenu } from "./sidebar-menu"
import { domAnimation, LazyMotion } from "framer-motion"

const meta: Meta<typeof SidebarMenu> = {
  title: "UI/Menu",
  component: SidebarMenu,
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const SidebarMenuDefault: Story = {
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
