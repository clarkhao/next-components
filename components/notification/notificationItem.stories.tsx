import type { Meta, StoryObj } from "@storybook/react"
import { NotificationItem } from "./notificationItem"
import { LoremIpsum } from "lorem-ipsum"

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

const meta: Meta<typeof NotificationItem> = {
  title: "UI/Notifications",
  component: NotificationItem,
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  args: {
    type: "sys",
    title: lorem.generateWords(3),
    msg: lorem.generateSentences(3),
    read: false,
    time: "41 minutes ago"
  },
  argTypes: {
    type: {
      options: ["sys", "sub", "work", "err", "promotion"],
      control: {
        type: "select",
      },
    },
    read: {
      options: [true, false],
      control: {
        type: "boolean"
      }
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Item: Story = {}
