import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Provider } from "react-redux"
import { Input } from "./input_v1"
import { makeStore } from "../../store"
import { User } from "lucide-react"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {
    labeltext: "UserName",
    type: "text",
    name: "name",
    verify: true,
    lefticon: <User className="h-auto w-4 stroke-2" />,
    variant: "filled",
    height: "md",
    disabled: false,
  },
  argTypes: {
    variant: {
      options: ["standard", "outlined", "filled"],
      control: { type: "radio" },
    },
    height: {
      options: ["xs", "sm", "md"],
      control: { type: "radio" },
    },
    name: {
      options: ["name", "email", "password"],
      control: {type: "radio"}
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const InputV1Default: Story = {
  decorators: [
    (Story) => {
      return (
        <Provider store={makeStore()}>
          <div className="flex max-w-[400px] flex-col items-center justify-center">
            <Story />
          </div>
        </Provider>
      )
    },
  ],
}
