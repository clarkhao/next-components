import React, { FC, HTMLAttributes } from "react"
import { cn } from "lib/utils"

export type TGalleryLayout<T> = {
  data: Array<T>
  /**
   * children element
   */
  element: FC<T>
  isMasonry?: boolean
  isGallery?: boolean
} & HTMLAttributes<HTMLLIElement>

export const ListLayout = React.forwardRef<HTMLUListElement, TGalleryLayout<any>>(
  ({ data, isMasonry = true, isGallery = true, element, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn(
          "gap-4",
          isGallery
            ? (isMasonry
              ? "columns-2 md:columns-3 lg:columns-4"
              : "max-xs:grid-cols-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4")
            : "columns-1 space-y-2"
        )}
      >
        {data.map((d, i) => {
          return (
            <li {...props} key={`key-${d.id}-${i}`}>
              {element(d)}
            </li>
          )
        })}
      </ul>
    )
  }
)
ListLayout.displayName = "ListLayout"
