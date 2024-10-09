import { QueryErrorResetBoundary } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { Recovery } from "components/error/recovery"
import { GalleryInfinite, GalleryPaginated, TGalleryPaginatedProps } from "./gallery"

export function GalleryPaginatedWithErrorBoundary<T, U>({
  queryWay = "infinite",
  isGallery,
  lastPageIndex,
  ...props
}: TGalleryPaginatedProps<T, U>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <Recovery error={error} recoveryHandler={() => resetErrorBoundary()} backPath="Home" />
          )}
          onReset={reset}
        >
          {queryWay === "infinite" ? (
            <GalleryInfinite<T, U> isGallery={isGallery} {...props} />
          ) : (
            <GalleryPaginated<T, U> lastPageIndex={lastPageIndex} isGallery={isGallery} {...props} />
          )}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
