import type { Meta, StoryObj } from "@storybook/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

const AccordionDemo = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const meta: Meta<typeof AccordionDemo> = {
  title: "UI/Accordion",
  component: AccordionDemo,
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Imported: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <span className="w-72">
            <Story />
          </span>
        </div>
      )
    },
  ],
}
