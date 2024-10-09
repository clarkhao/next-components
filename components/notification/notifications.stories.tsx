import type { Meta, StoryObj } from "@storybook/react"
import { NotificationIcon } from "./notifications"
import { Ellipsis } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown/dropdown-menu"
import { Fragment } from "react"
import { NotificationItem } from "./notificationItem"
import { LoremIpsum } from "lorem-ipsum"
import { ButtonWrapper } from "components/button/button_v2"
import { cn } from "lib/utils"
import { ReactQueryProvider } from "layout/queryProvider"
import { GalleryPaginatedWithErrorBoundary } from "components/list/galleryWithErrorBoundary"
import { useMutation, useQueryClient } from "@tanstack/react-query"
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})
type TItem = {
  id: string
  type: "sys" | "sub" | "work" | "err" | "promotion"
  title: string
  msg: string
  read: boolean
  time: string
}
async function updateItem(item: TItem) {
  try {
    const response = await fetch(`http://localhost:3000/notifications/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        read: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to update item: ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Item updated successfully:", data)
    return data
  } catch (error) {
    console.error("Error updating item:", error)
    throw error
  }
}
const Item = ({ id, type, title, msg, read, time }: TItem) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      })
    },
  })
  return (
    <>
      <DropdownMenuItem
        className={cn("flex flex-row items-start justify-center", "hover:cursor-pointer")}
        onClick={() => {
          console.log(read)
          if (!read) {
            mutation.mutate({ id, type, title, msg, read, time })
          }
        }}
      >
        <NotificationItem type={type} title={title} msg={msg} read={read} time={time} />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
    </>
  )
}
function NotificationDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NotificationIcon num={12} className={""} description="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="h-fit max-h-[610px] w-80 overflow-auto">
        <DropdownMenuLabel className="flex flex-row items-center justify-between">
          <h2>Notifications</h2>
          <ButtonWrapper state={"prev"} variant={"link"}>
            mark all as read
          </ButtonWrapper>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="relative flex flex-col items-start pb-12">
          <GalleryPaginatedWithErrorBoundary<TItem, TItem>
            baseUrl={"http://localhost:3000/notifications"}
            queryKey={"notifications"}
            element={Item}
            queryWay="infinite"
            isGallery={false}
            transform={(data) => {
              return data.map((el) => {
                const current = Date.now()
                const time = new Date(el.time).getTime()
                let diffInMs = time - current
                const isFuture = diffInMs > 0 // Check if it's in the future
                diffInMs = Math.abs(diffInMs) // Get absolute value for easier calculation

                // Convert milliseconds to days, hours, minutes
                const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
                const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60))

                // Format result string
                const result = `${days} days ${hours} hours ${minutes} minutes`
                return {
                  ...el,
                  time: isFuture ? `in ${result}` : `${result} ago`,
                }
              })
            }}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const meta: Meta<typeof NotificationDemo> = {
  title: "UI/Notifications",
  component: NotificationDemo,
  parameters: {
    layout: "padded",
    controls: { expanded: true },
  },
  args: {},
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <ReactQueryProvider>
          <div className="flex items-center justify-center">
            <Story />
          </div>
        </ReactQueryProvider>
      )
    },
  ],
}
