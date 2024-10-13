import type { Meta, StoryObj } from "@storybook/react"
import { Toolbar } from "./toolbar"
import React from "react"

const ToolbarDemo = () => {
  const [folded, setFold] = React.useState(false)
  return <Toolbar folded={folded} setFolded={() => setFold(!folded)} />
}

const meta: Meta<typeof ToolbarDemo> = {
  title: "UI/Toolbar",
  component: ToolbarDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const ToolbarDefault: Story = {
  decorators: [],
}
