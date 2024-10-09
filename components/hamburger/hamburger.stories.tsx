import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { ButtonWrapper } from "components/button/button_v2"
import { Hamburger } from "./hamburger"
import { domAnimation, LazyMotion } from "framer-motion"

const MenuButtonDemo = () => {
  const [isOpen, setOpen] = React.useState(false)
  return (
    <ButtonWrapper
      state={"prev"}
      size={"icon"}
      variant={"ghost"}
      className="hover:bg-transparent"
      onClick={() => setOpen(!isOpen)}
    >
      <LazyMotion features={domAnimation}>
        <Hamburger isOpen={isOpen} />
      </LazyMotion>
    </ButtonWrapper>
  )
}

const meta: Meta<typeof MenuButtonDemo> = {
  title: "UI/Hamburger",
  component: MenuButtonDemo,
  parameters: {
    layout: "padded",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const MenuBtn: Story = {}
