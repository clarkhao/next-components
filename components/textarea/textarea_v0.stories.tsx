import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./textarea_v0";

const meta: Meta<typeof TextArea> = {
  title: "UI/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    pos: [0, 0],
    isOutlined: true,
    isMoving: false,
    textSize: 20,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TextAreaV0: Story = {
  decorators: [
    (Story) => {
      return <div className="w-full min-h-screen">
        <Story />
      </div>
    }
  ]
};
