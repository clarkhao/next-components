import type { Meta, StoryObj } from "@storybook/react"
import { ReactQueryProvider } from "layout/queryProvider"
import { domAnimation, LazyMotion } from "framer-motion"
import { GalleryPaginatedWithErrorBoundary } from "./galleryWithErrorBoundary"
import { Fragment } from "react"
import { NotificationItem } from "components/notification/notificationItem"
import { cn } from "lib/utils"

type TItem = {
  title: string
  msg: string
  timeStamp: string
}
const Item = ({ title, msg, timeStamp }: TItem) => {
  return (
    <Fragment>
      <div className={cn("flex flex-row items-start justify-center", "w-[400px] hover:cursor-pointer")}>
        <NotificationItem type={"sub"} title={title} msg={msg} read={false} time={timeStamp} />
      </div>
    </Fragment>
  )
}

type TListDemo = {
  queryWay: "infinite" | "pagination"
  isGallery: boolean
}
const ListPaginatedDemo = ({ queryWay, isGallery }: TListDemo) => {
  return (
    <GalleryPaginatedWithErrorBoundary<{ id: string; title: string; message: string; timestamp: string }, TItem>
      baseUrl={"http://localhost:3000/notifications"}
      queryKey={"notifications"}
      element={Item}
      lastPageIndex={6}
      queryWay={queryWay}
      isGallery={isGallery}
      transform={(data) =>
        data.map((el) => {
          return {
            msg: el.message,
            id: el.id,
            timeStamp: el.timestamp,
            title: el.title,
          }
        })
      }
    />
  )
}

const meta: Meta<typeof ListPaginatedDemo> = {
  title: "UI/Gallery",
  component: ListPaginatedDemo,
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
  },
  args: {
    queryWay: "pagination",
    isGallery: false,
  },
  argTypes: {
    queryWay: {
      options: ["infinite", "pagination"],
      control: {
        type: "radio",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ListDefault: Story = {
  decorators: [
    (Story) => {
      return (
        <ReactQueryProvider>
          <div className="flex w-full flex-col items-center justify-start py-4">
            <LazyMotion features={domAnimation}>
              <Story />
            </LazyMotion>
          </div>
        </ReactQueryProvider>
      )
    },
  ],
}
