import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "./label"
import { RadioGroup, RadioGroupItem } from "./radio-group"

function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}
const meta: Meta<typeof RadioGroupDemo> = {
  title: "UI/RadioGroup",
  component: RadioGroupDemo,
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