import type { Meta, StoryObj } from "@storybook/react"
import { Toast } from "./toast"
import { domAnimation, LazyMotion } from "framer-motion"

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    timed: "md",
    msg: "Hello World!.I am Clark",
    variant: "colored",
    colors: "info",
    display: "standard",
    handleDel: () => {
      console.log("delete this toast")
    },
  },
  argTypes: {
    colors: {
      options: ["info", "success", "error", "warning", "msg"],
      control: {
        type: "select",
      },
    },
    display: {
      options: ["standard", "writer"],
      control: {
        type: "radio",
      },
    },
    variant: {
      options: ["default", "colored"],
      control: {
        type: "radio",
      },
    },
    timed: {
      options: ["sm", "md", "lg"],
      control: {
        type: "select",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ToastDefault: Story = {
  decorators: [
    (Story) => {
      return (
        <LazyMotion features={domAnimation}>
          <Story />
        </LazyMotion>
      )
    },
  ],
}
