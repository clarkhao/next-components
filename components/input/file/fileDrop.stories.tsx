import type { Meta, StoryObj } from "@storybook/react";
import { DropFileZone } from "./fileDrop";

const meta: Meta<typeof DropFileZone> = {
  title: "UI/Input",
  component: DropFileZone,
  parameters: {
    layout: "padded",
  },
  args: {
    multiple: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DropFileZoneDefault: Story = {
  
};
