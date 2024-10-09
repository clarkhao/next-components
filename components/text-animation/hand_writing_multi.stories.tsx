import type { Meta, StoryObj } from "@storybook/react"
import { HandWriting } from "./hand_writing_v3"

const meta: Meta<typeof HandWriting> = {
  title: "UI/Text-Animation",
  component: HandWriting,
  parameters: {
    layout: "padded",
  },
  args: {
    texts: [
      {
        id: "initial",
        text: "aaaaa's leaders are jubilant aaaaa's leaders are jubilant aaaaa's leaders are jubilant",
        fontSize: 24,
        duration: 300,
        offset: { x: 0, y: 0 },
        delay: 0
      },
      {
        id: "1",
        text: "bbbbb's leaders are jubilant",
        fontSize: 24,
        duration: 300,
        offset: { x: 0, y: 0 },
        delay: 0
      },
      {
        id: "2",
        text: "ccccc's leaders are jubilant",
        fontSize: 24,
        duration: 300,
        offset: { x: 0, y: 0 },
        delay: 0
      },
    ],
    start: false,
    isMultiLine: false,
    handSize: "sm",
    fromTop: 60
  },
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Number>

export const HandWritingMultiItem: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="min-h-screen w-[800px] bg-linear-bg bg-linear-paper bg-linear-size shadow-lg">
          <Story />
        </div>
      )
    },
  ],
}
