import type { Meta, StoryObj } from "@storybook/react"
import Autoplay from "embla-carousel-autoplay"
import { useState } from "react"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel"
import { Card, CardContent } from "../card/card"
const CarouselDemo = () => {
  const [api, setApi] = useState<CarouselApi>()

  const handlePrevious = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  const handleNext = () => {
    if (api) {
      api.scrollNext();
    }
  };
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
      setApi={setApi}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onClick={handleNext}/>
      <CarouselNext onClick={handlePrevious}/>
    </Carousel>
  )
}
const meta: Meta<typeof CarouselDemo> = {
  title: "UI/Carousel",
  component: CarouselDemo,
  parameters: {
    layout: "centered",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
