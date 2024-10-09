import type { Meta, StoryObj } from "@storybook/react"
import { HandPen} from "./icons"

const meta: Meta<typeof HandPen> = {
  title: "UI/Icons",
  component: HandPen,
  parameters: {
    layout: "centered",
  },
  args: {
    className: "size-20"
  },
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const HandPenDefault: Story = {}
