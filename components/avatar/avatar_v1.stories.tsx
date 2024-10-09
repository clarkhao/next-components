import type { Meta, StoryObj } from "@storybook/react"
import { AvatarWrapper } from "./avatarWrapper"

const meta: Meta<typeof AvatarWrapper> = {
  title: "UI/Avatar",
  component: AvatarWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
  },
  args: {
    shape: "circular",
    size: "md",
    isLocal: false,
    name: "Clark",
    imageSrc: "https://lh3.googleusercontent.com/a/ACg8ocJEri1I16tD_i80ZYT5HYhZr-xoq6ZWDVSnE7R22hwLorR66A=s96-c",
    onClick: () => window.alert("avatar"),
  },
  argTypes: {
    shape: {
      options: ["circular", "square"],
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
      control: { type: "select" },
    },
    isLocal: {
      options: [true, false],
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const AvatarV1: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="flex flex-row justify-center">
          <Story />
        </div>
      )
    },
  ],
  
}
