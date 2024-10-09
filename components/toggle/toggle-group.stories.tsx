import type { Meta, StoryObj } from "@storybook/react"
import { Bold, Italic, Underline } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "./toggle-group"

function ToggleGroupDemo() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
const meta: Meta<typeof ToggleGroupDemo> = {
  title: "UI/ToggleGroup",
  component: ToggleGroupDemo,
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}