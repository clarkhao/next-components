import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { ButtonWrapper } from "components/button/button_v2"
import { Modal } from "./modal_v1"
import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion"
import { Login } from "components/login/login"

function ModalDemo() {
  const [isOpen, setOpen] = React.useState(false)
  return (
    <div className="relative h-screen w-full">
      {isOpen && <div className="z-10 size-full bg-gray-200/80 dark:bg-gray-700/80"></div>}
      <ButtonWrapper animated={false} className="absolute inset-0 m-auto w-32" state={"prev"} onClick={() => setOpen(true)} size={"lg"}>
        Open
      </ButtonWrapper>
      <AnimatePresence initial={false}>
        {isOpen && (
          <Modal isOpen={isOpen} handleSwitch={() => setOpen(false)} animateEffect="yMotion">
            <Login
              handleSignin={function (): void {
                throw new Error("Function not implemented.")
              }}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  )
}

const meta: Meta<typeof ModalDemo> = {
  title: "UI/Modal",
  component: ModalDemo,
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
        <LazyMotion features={domAnimation}>
          <Story />
        </LazyMotion>
      )
    },
  ],
}
