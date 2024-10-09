import type { Meta, StoryObj } from "@storybook/react"
import { Bell } from "lucide-react"
import { ButtonWrapper } from "components/button/button_v2"
import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
  },
  args: {
    intent: "primary",
    isDot: false,
    isAnimated: true,
    className: "right-0 top-0",
    children: (
      <ButtonWrapper size="icon" variant="secondary" disabled={false} state={"prev"} className="rounded-full">
        <Bell className="h-6" />
      </ButtonWrapper>
    ),
    num: 3,
  },
  argTypes: {
    isDot: {
      options: [true, false],
      control: { type: "boolean" },
    },
    isAnimated: {
      options: [true, false],
      control: { type: "boolean" },
    },
    intent: {
      options: ["primary", "secondary", "success", "error", "invalid"],
      control: { type: "select" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
