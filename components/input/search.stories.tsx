import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { SearchWrapper } from "./searchWrapper"
import { Provider } from "react-redux"
import { makeStore } from "store"

const meta: Meta<typeof SearchWrapper> = {
  title: "UI/Input",
  component: SearchWrapper,
  parameters: {
    layout: "padded",
  },
  args: {
    labeltext: "Search",
    type: "search",
    name: "text",
    verify: false,
    variant: "outlined",
    height: "md",
    disabled: false,
    className: "w-full",
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
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const SearchDefault: Story = {
  decorators: [
    (Story) => {
      return (
        <Provider store={makeStore()}>
          <div className="w-full">
            <Story />
          </div>
        </Provider>
      )
    },
  ],
}
