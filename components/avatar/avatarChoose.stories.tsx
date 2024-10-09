import type { Meta, StoryObj } from "@storybook/react"
import { AvatarChoose } from "./avatarChoose"

const meta: Meta<typeof AvatarChoose> = {
  title: "UI/Avatar",
  component: AvatarChoose,
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const AvatarChooseDemo: Story = {}
