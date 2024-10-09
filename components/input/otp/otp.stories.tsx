import type { Meta, StoryObj } from "@storybook/react";
import { OTP } from "./otp";

const meta: Meta<typeof OTP> = {
  title: "UI/Input",
  component: OTP,
  parameters: {
    layout: "padded",
  },
  args: {
    size: 6,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InputOTPDefault: Story = {
  
};
