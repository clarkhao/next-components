import type { Meta, StoryObj } from "@storybook/react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { ButtonWrapper } from "components/button/button_v2"
import { Label } from "components/radio/label"
import { InputWrapper } from "components/input/input_v2_wrapper"

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonWrapper variant="outline" state={"prev"}>
          Edit Profile
        </ButtonWrapper>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <span className="col-span-3">
              <InputWrapper labelText={""} config={"name"} height="xs" variant={"outlined"} isLeftIcon={false} />
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <span className="col-span-3">
              <InputWrapper labelText={""} config={"name"} height="xs" variant={"outlined"} isLeftIcon={false} />
            </span>
          </div>
        </div>
        <DialogFooter>
          <ButtonWrapper type="submit" state={"prev"}>
            Save changes
          </ButtonWrapper>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const meta: Meta<typeof DialogDemo> = {
  title: "UI/Dialog",
  component: DialogDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const DialogDefault: Story = {}
