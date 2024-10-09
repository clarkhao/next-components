import type { Meta, StoryObj } from "@storybook/react";
import Pagination, { TPagination } from "./pagination_pattern_b";
import { ListContext, useFetch } from "./hook";
import React from "react";

function PaginationWithContext({lastPageIndex, ...props}: TPagination) {
  const { listState, listDispatch } = useFetch();

  return (
    <ListContext.Provider value={{ listState, listDispatch }}>
      <Pagination lastPageIndex={lastPageIndex} {...props}/>
    </ListContext.Provider>
  );
}

const meta: Meta<typeof PaginationWithContext> = {
  title: "UI/Pagination",
  component: PaginationWithContext,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PaginationPatternB: Story = {
  args: {
    lastPageIndex: Number.POSITIVE_INFINITY
  },
};
