import type { Meta, StoryObj } from "@storybook/react"
import { Heart } from "lucide-react"
import Image from "next/image"
import { AvatarWrapper } from "components/avatar/avatarWrapper"
import { ReactQueryProvider } from "layout/queryProvider"
import { rgbDataURL } from "lib/blur"
import { GalleryPaginatedWithErrorBoundary } from "./galleryWithErrorBoundary"
import { domAnimation, LazyMotion } from "framer-motion"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cn } from "lib/utils"

type TImage = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

type TPost = {
  createdAt: string
  name: string
  avatar: string
  like: string
  title: string
  description: string
  tags: string
  id: string
  image: TImage
  liked: boolean
}

async function updateItem(item: TPost) {
  try {
    const response = await fetch(`http://localhost:3000/posts/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        liked: item.liked ? false : true,
        like: item.liked ? parseInt(item.like) - 1 : parseInt(item.like) + 1,
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

const Item = (item: TPost) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      })
    },
  })
  return (
    <div className="relative mb-10 flex flex-col">
      <Image
        key={item.title as string}
        src={item.image?.download_url as string}
        alt="unsplash"
        width={item.image.width}
        height={item.image.height}
        className="mb-3 h-auto max-w-full rounded-lg shadow"
        placeholder="blur"
        blurDataURL={rgbDataURL(216, 216, 217)}
      />
      <span className="absolute -bottom-6 left-0 flex w-full flex-row items-start justify-between">
        <span className="flex flex-row items-center justify-start gap-1 px-1 pb-2">
          <AvatarWrapper isLocal={true} size={"xs"} shape={"circular"} imageSrc={item.avatar} name={""} />
          <span>{item.name}</span>
        </span>
        <span className="flex flex-row items-center justify-end gap-1 hover:cursor-pointer">
          <Heart
            className={cn(item.liked ? "fill-red-600 text-red-400" : "")}
            onClick={() => {
              mutation.mutate(item)
            }}
          />
          <span>{item.like}</span>
        </span>
      </span>
    </div>
  )
}

type TGalleryDemo = {
  queryWay: "infinite" | "pagination"
  isMasonry: boolean
  isGallery: boolean
}

const GalleryPaginatedDemo = ({ queryWay, isMasonry, isGallery }: TGalleryDemo) => {
  return (
    <GalleryPaginatedWithErrorBoundary<TPost, TPost>
      baseUrl={"http://localhost:3000/posts"}
      queryKey={"posts"}
      isMasonry={isMasonry}
      element={Item}
      lastPageIndex={5}
      queryWay={queryWay}
      isGallery={isGallery}
    />
  )
}

const meta: Meta<typeof GalleryPaginatedDemo> = {
  title: "UI/Gallery",
  component: GalleryPaginatedDemo,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Paginated: Story = {
  args: {
    queryWay: "infinite",
    isMasonry: true,
    isGallery: true
  },
  argTypes: {
    queryWay: {
      options: ["infinite", "pagination"],
      control: {
        type: "radio",
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <ReactQueryProvider>
          <LazyMotion features={domAnimation}>
            <div className="flex min-h-screen w-full flex-col items-center justify-start py-4">
              <Story />
            </div>
          </LazyMotion>
        </ReactQueryProvider>
      )
    },
  ],
}
