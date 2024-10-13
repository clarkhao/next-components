import {
  keepPreviousData,
  QueryErrorResetBoundary,
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { ListLayout, TGalleryLayout } from "./layout"
import { SpinnerOverlay } from "components/spinner/spinnerOverlay"
import { Fragment, Suspense } from "react"
import React from "react"
import { ButtonWrapper } from "components/button/button_v2"
import { DynamicPagination, TDynamicPagination } from "../pagination/pagination_a_v1"
import { DynamicListContext, usePage } from "../pagination/dynamicHook"
// T is the original item type within list,
// and U is the transformed item type if needed,
// otherwise U is set to be never
export type TGalleryPaginatedProps<T, U> = {
  baseUrl: string
  // the key to keep the data
  queryKey: string
  lastPageIndex?: number
  transform?: (data: Array<T>) => Array<U>
  initialData?: Array<T> | Array<U>
  queryWay?: "pagination" | "infinite"
} & Omit<TGalleryLayout<U>, "data">

export async function fetchItems<T, U>(
  baseUrl: string,
  page = 1,
  signal: AbortSignal | undefined,
  transform?: (data: Array<T>) => Array<U>
) {
  const response = await fetch(`${baseUrl}?_limit=10&_page=${page}&_sort=read`, { signal })
  if (!response.ok) {
    throw new Error("Failed to fetch items")
  }
  const data = (await response.json()) as unknown
  // if data is {} not []
  const items = data as Array<T>

  return transform ? transform(items) : items
}

export function GalleryPaginated<T, U>({
  baseUrl,
  queryKey,
  lastPageIndex = Infinity,
  transform,
  initialData,
  ...props
}: TGalleryPaginatedProps<T, U>) {
  const { listState, listDispatch } = usePage()
  // isLoading = isFetching && !isPending
  const { isPending, isError, error, data, isFetching, isLoading, ...info } = useQuery({
    queryKey: [queryKey, listState.currentIndex],
    queryFn: ({ signal }) => fetchItems<T, U>(baseUrl, listState.currentIndex, signal, transform),
    placeholderData: keepPreviousData,
    //set this to ensure error boundary work
    throwOnError: true,
  })

  if (isPending) {
    return <SpinnerOverlay overlayed pattern={4} />
  }
  if (isError) {
    return <div>Error: {(error as Error).message}</div>
  }

  return (
    <DynamicListContext.Provider value={{ listState, listDispatch }}>
      <Suspense fallback={<SpinnerOverlay overlayed={false} pattern={1} />}>
        <ListLayout data={data ?? []} {...props} />
      </Suspense>
      <DynamicPagination total={lastPageIndex} />
    </DynamicListContext.Provider>
  )
}

export function GalleryInfinite<T, U>({
  baseUrl,
  queryKey,
  transform,
  initialData,
  ...props
}: TGalleryPaginatedProps<T, U>) {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: ({ signal, pageParam }) => fetchItems<T, U>(baseUrl, pageParam, signal, transform),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined
    },
    throwOnError: true,
  })
  if (status === "pending") {
    return <SpinnerOverlay overlayed pattern={4} />
  }
  if (status === "error") {
    return <div>Error: {(error as Error).message}</div>
  }

  return (
    <>
      {data.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            <ListLayout data={group} {...props} />
          </Fragment>
        )
      })}
      <ButtonWrapper
        state={"prev"}
        variant={"default"}
        size={"default"}
        asChild={false}
        onClick={() => fetchNextPage()}
        className="w-48 absolute inset-x-0 mx-auto bottom-2"
        disabled={!hasNextPage || isFetchingNextPage}
        animated={false}
      >
        {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
      </ButtonWrapper>
    </>
  )
}
