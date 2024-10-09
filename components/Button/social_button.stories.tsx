import type { Meta, StoryObj } from "@storybook/react"
import { ButtonWrapper } from "./button_v2"
import { Facebook } from "lucide-react"
import { AppleIcon, GoogleIcon } from "components/icons/icons"

const ButtonDemo = () => {
  return (
    <div className="flex flex-col justify-center gap-4 w-64">
      <ButtonWrapper
        state={"prev"}
        variant={"default"}
        size={"default"}
        className="relative hover:bg-gray-600 dark:hover:bg-gray-200 bg-gray-800 dark:bg-gray-100 dark:text-background"
      >
        <GoogleIcon className=" absolute left-1 size-4 rounded-full fill-white stroke-white" />
        <span className="pl-8">Continue with Google</span>
      </ButtonWrapper>
      <ButtonWrapper state={"prev"} variant={"outline"} size={"default"} className="relative">
        <AppleIcon className=" absolute left-1 size-4 rounded-full fill-foreground stroke-black" />
        <span className="pl-8">Continue with Apple</span>
      </ButtonWrapper>
      <ButtonWrapper
        state={"prev"}
        variant="outline"
        size={"default"}
        className="relative bg-orange-400 text-white hover:bg-orange-300"
      >
        <Facebook className="absolute left-1 size-5 rounded-full bg-blue-600 fill-white stroke-none" />
        <span className="pl-8">Continue with Facebook</span>
      </ButtonWrapper>
    </div>
  )
}

const meta: Meta<typeof ButtonDemo> = {
  title: "UI/Button",
  component: ButtonDemo,
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const SocialButton: Story = {}
