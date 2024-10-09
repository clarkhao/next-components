import type { Meta, StoryObj } from "@storybook/react"
import { DynamicPagination, TDynamicPagination } from "./pagination_pattern_a"
import React from "react"
import { DynamicListContext, usePage } from "./dynamicHook"
const DynamicPaginationShow = ({ total, ...props }: TDynamicPagination) => {
  const { listState, listDispatch } = usePage()
  return (
    <DynamicListContext.Provider value={{ listState, listDispatch }}>
      <DynamicPagination total={total} {...props} />
    </DynamicListContext.Provider>
  )
}

const meta: Meta<typeof DynamicPaginationShow> = {
  title: "UI/Pagination",
  component: DynamicPaginationShow,
  parameters: {
    layout: "centered",
  },
  args: {
    total: 100,
    use: "page",
  },
  argTypes: {
    use: {
      options: ["page", "counter"],
      control: { type: "radio" },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const PaginationPatternA: Story = {}
