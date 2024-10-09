import type { Meta, StoryObj } from "@storybook/react"
import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion"
import React from "react"
import { Login } from "components/login/login"
import { Modal } from "components/modal/modal_v1"
import { Navbar, TNavbar } from "./nav"

const NavbarDemo = ({ ...props }: Omit<TNavbar, "isOpen" | "handleSwitch">) => {
  const [isOpen, setOpen] = React.useState(false)
  return (
    <div className="relative h-screen w-full ">
      {/* backdrop layer */}
      {isOpen && <div className="z-10 size-full bg-gray-200/80 dark:bg-gray-700/80"></div>}
      <Navbar isOpen={isOpen} handleSwitch={() => setOpen(true)} {...props} />
      <AnimatePresence>
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

const meta: Meta<typeof NavbarDemo> = {
  title: "UI/Nav",
  component: NavbarDemo,
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  args: {
    isLogged: false,
    name: "",
    email: "",
  },
  argTypes: {
    isLogged: {
      options: [true, false],
      control: { type: "boolean" },
    },
  },
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
