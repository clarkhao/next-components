import type { Meta, StoryObj } from "@storybook/react"
import { Login } from "./login"

const meta: Meta<typeof Login> = {
  title: "UI/Login",
  component: Login,
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Social: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="w-72">
          <Story />
        </div>
      )
    },
  ],
}
