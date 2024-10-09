import type { Meta, StoryObj } from "@storybook/react"
import Pagination, { TPagination } from "./pagination_b_v1"
import { ListContext, useFetch } from "./hook"
import React from "react"
import { domAnimation, LazyMotion } from "framer-motion"

function PaginationWithContext({ lastPageIndex, ...props }: TPagination) {
  const { listState, listDispatch } = useFetch()

  return (
    <ListContext.Provider value={{ listState, listDispatch }}>
      <LazyMotion features={domAnimation}>
        <Pagination lastPageIndex={lastPageIndex} {...props} />
      </LazyMotion>
    </ListContext.Provider>
  )
}

const meta: Meta<typeof PaginationWithContext> = {
  title: "UI/Pagination",
  component: PaginationWithContext,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const PaginationPatternBV1: Story = {
  args: {
    lastPageIndex: Number.POSITIVE_INFINITY,
  },
}
