import type { Meta, StoryObj } from "@storybook/react";
import { KeyRound } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { Input } from "./input_v1";
import { makeStore } from "../../store";
import { RootState } from "../../store";
import { add } from "../../store/slices/error";
import { ButtonWrapper } from "../button/button_v2";

function PasswordDemo() {
  const dispatch = useDispatch();
  const errState = useSelector((state: RootState) => state.error.errors);
  const fields = useSelector((state: RootState) => state.auth.fields);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(add({ from: "password", message: "some request error" }));
  };
  const [value, setValue] = React.useState("");

  return (
    <form className="flex w-[400px] flex-col items-end gap-y-4">
      <Input
        labeltext="Password"
        type={fields["type"]}
        name="password"
        variant={"filled"}
        height="md"
        lefticon={<KeyRound className="h-auto w-4" />}
        reqerr={errState?.password}
        value={value}
        handleset={(v) => setValue(v)}
        verify={true}
      />
      <ButtonWrapper
        variant={"default"}
        size={"lg"}
        state={"prev"}
        className="w-60"
        onClick={handleSubmit}
        disabled={errState["password-verify"] !== undefined || value === ""}
      >
        Submit
      </ButtonWrapper>
    </form>
  );
}

const meta: Meta<typeof PasswordDemo> = {
  title: "UI/Input",
  component: PasswordDemo,
  parameters: {
    layout: "padded",
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PasswordWithInputV1: Story = {
  
  decorators: [
    (Story) => {
      return (
        <Provider store={makeStore()}>
          <Story />
        </Provider>
      );
    },
  ],
};
