import type { Meta, StoryObj } from "@storybook/react"
import Image from "next/image"
import { AspectRatio } from "./aspect-ratio"

function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        fill
        className="rounded-md object-cover"
      />
    </AspectRatio>
  )
}

const meta: Meta<typeof AspectRatioDemo> = {
  title: "UI/AspectRatio",
  component: AspectRatioDemo,
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
  
}
