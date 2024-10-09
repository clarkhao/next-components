import type { Meta, StoryObj } from "@storybook/react"
import { AppleIcon, GoogleIcon, PaperPlane } from "./icons"
import { cn } from "lib/utils"

const IconDemo = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <PaperPlane
        className={cn("stroke h-auto w-5 md:w-6 dark:fill-white dark:stroke-gray-400", "fill-black stroke-gray-400")}
      />
      <AppleIcon
        className={cn("stroke h-auto w-4 md:w-5  dark:fill-white dark:stroke-gray-400", "fill-black stroke-gray-400")}
      />
      <GoogleIcon
        className={cn("stroke h-auto w-4 md:w-5  dark:fill-white dark:stroke-gray-400", "fill-black stroke-gray-400")}
      />
    </div>
  )
}

const meta: Meta<typeof IconDemo> = {
  title: "UI/Icons",
  component: IconDemo,
  parameters: {
    layout: "centered",
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
