import type { Meta, StoryObj } from "@storybook/react"
import { DraggableList } from "./draggableList"
import React from "react"
import { DraggableItem } from "./item"
import { TextItem } from "./textItem/textItem"
import { TextItemAbbr } from "./textItem/textItemAbbr"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/dialog/dialog"
import { ButtonWrapper } from "components/button/button_v2"
import { Minus } from "lucide-react"
import { Chip } from "components/chip/chip"
type TItem = {
  id: string
  content: string
}
const DraggableListDemo = () => {
  const [item, setItem] = React.useState<Array<TItem>>([
    { id: "1", content: "a" },
    { id: "2", content: "b" },
    { id: "3", content: "c" },
  ])
  return (
    <DraggableList<TItem>
      data={item}
      setData={setItem}
      element={(v) => {
        return (
          <Dialog>
            <TextItemAbbr id={parseInt(v.id)} from={"Quote from xxx..."}>
              <DialogTrigger asChild>
                <ButtonWrapper state={"prev"} variant={"outline"} size="sm">
                  Quote from xxx...
                </ButtonWrapper>
              </DialogTrigger>
            </TextItemAbbr>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <TextItem />
              <DialogFooter>
                <ButtonWrapper type="submit" state={"prev"}>
                  Save changes
                </ButtonWrapper>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      }}
    />
  )
}

const meta: Meta<typeof DraggableListDemo> = {
  title: "UI/Draggable",
  component: DraggableListDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const DraggableListDefault: Story = {}
