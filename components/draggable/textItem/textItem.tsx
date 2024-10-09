import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/accordion/accordion"
import { InputWrapper } from "components/input/input_v2_wrapper"
import { Textarea } from "components/textarea/textarea"
import { ToggleGroup, ToggleGroupItem } from "components/toggle/toggle-group"

export function TextItem() {
  return (
    <div className="w-full">
      <span>
        <label>Quote Content on page one</label>
        <Textarea />
      </span>
      <span>
        <label>where is quote from?</label>
        <InputWrapper labelText={""} config={"quoteFrom"} height="sm" isLeftIcon={false} variant={"outlined"} />
      </span>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Layout</AccordionTrigger>
          <AccordionContent>
            <span className="flex flex-row items-center justify-end gap-4">
              <label>Alignment</label>
              <ToggleGroup type="single" variant={"outline"} size={"sm"}>
                <ToggleGroupItem value="left" aria-label="Toggle bold">
                  Left
                </ToggleGroupItem>
                <ToggleGroupItem value="middle" aria-label="Toggle italic">
                  Middle
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Toggle underline">
                  Right
                </ToggleGroupItem>
              </ToggleGroup>
            </span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Background</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Font</AccordionTrigger>
          <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Animation</AccordionTrigger>
          <AccordionContent>Yes. It&apos;s animated by default, but you can disable it if you prefer.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
