import type { Meta, StoryObj } from "@storybook/react"
import { HandWriting } from "./hand_writing"
import { Container } from "lucide-react"

const meta: Meta<typeof HandWriting> = {
  title: "UI/Text-Animation",
  component: HandWriting,
  parameters: {
    layout: "padded",
  },
  args: {
    text: "Israel's leaders are jubilant about the progress of the offensive against Hezbollah that started with the detonation of weaponised pagers and radios and moved on to intense and deadly airstrikes.",
    fromTop: 50,
    start: false,
    fontSize: 32
  },
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Number>

export const HandWritingDefault: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="w-[800px] bg-linear-paper bg-linear-size bg-linear-bg min-h-screen shadow-lg">
          <Story />
        </div>
      )
    },
  ],
}
