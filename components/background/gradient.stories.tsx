import type { Meta, StoryObj } from "@storybook/react"
import { WebglBackground } from "./gradient"
import { cn } from "lib/utils"

const meta: Meta<typeof WebglBackground> = {
  title: "UI/Background",
  component: WebglBackground,
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="bg-radial-gradient relative h-screen w-full">
          <Story />
          <div
            className={cn(
              "absolute inset-0 m-auto h-5/6 w-5/6 rounded-lg border-0 bg-white/30 p-9 backdrop-blur",
              "flex items-center justify-center text-lg"
            )}
          >
            hello world
          </div>
        </div>
      )
    },
  ],
}
