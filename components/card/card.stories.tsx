import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

const CardDemo = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  )
}

const meta: Meta<typeof CardDemo> = {
  title: "UI/Card",
  component: CardDemo,
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
