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
        text: "Israel's leaders are jubilant about the progress of the offensive against Hezbollah that started with the detonation of weaponised pagers and radios and moved on to intense and deadly airstrikes.",
        fontSize: 24,
        duration: 300,
        offset: { x: 48, y: 0 },
        delay: 0
      },
    ],
    start: false,
    isMultiLine: true,
    handSize: "sm",
    fromTop: 60,
  },
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Number>

export const HandWritingOneItem: Story = {
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
