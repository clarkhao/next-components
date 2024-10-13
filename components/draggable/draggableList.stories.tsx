import type { Meta, StoryObj } from "@storybook/react"
import { DraggableList } from "./draggableList"
import React from "react"
import { TextItem } from "./textItem/textItem"
import { TextItemAbbr } from "./textItem/textItemAbbr"
import { ToggleGroup, ToggleGroupItem } from "components/toggle/toggle-group"
import { AnimatePresence, domAnimation, LazyMotion, m, Variants } from "framer-motion"
import { animationVariants } from "lib/animate"
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
  const [index, setIndex] = React.useState<string>("")
  return (
    <div className="flex w-full flex-col items-start justify-start gap-4 overflow-x-hidden">
      <ToggleGroup type="single" className="w-full" onValueChange={(v) => {
        console.log(v.length)
        setIndex(v)
      }}>
        <DraggableList<TItem>
          data={item}
          setData={setItem}
          element={(v) => {
            return (
              <TextItemAbbr id={parseInt(v.id)} from={"Quote from xxx..."}>
                <ToggleGroupItem value={v.id} aria-label="Toggle bold">
                  Quote from xxx...
                </ToggleGroupItem>
              </TextItemAbbr>
            )
          }}
        />
      </ToggleGroup>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={index}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={animationVariants["xMotion"] as Variants}
          transition={{ duration: 0.15 }}
          className="w-full"
        >
          {index.length > 0 ? <TextItem id={index} /> : null}
        </m.div>
      </AnimatePresence>
    </div>
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

export const DraggableListDefault: Story = {
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
