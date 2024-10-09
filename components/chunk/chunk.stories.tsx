import type { Meta, StoryObj } from "@storybook/react"
import { Chunk } from "./chunk"
import { ReactQueryProvider } from "layout/queryProvider"

const meta: Meta<typeof Chunk> = {
  title: "UI/Chunk",
  component: Chunk,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const ChunkDefault: Story = {
  decorators: [
    (Story) => {
      return (
        <ReactQueryProvider>
          <Story />
        </ReactQueryProvider>
      )
    },
  ],
}
