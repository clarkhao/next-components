import type { Meta, StoryObj } from "@storybook/react"
import { Announcement } from "./announcement"

const meta: Meta<typeof Announcement> = {
  title: "UI/Announcement",
  component: Announcement,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
  },
  args: {
    animated: true,
    text: "You can now use Amazon Cognito.",
    link: "https://www.youtube.com/"
  },
  argTypes: {
    animated: {
      options: [true, false],
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
