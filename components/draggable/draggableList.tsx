import { HTMLMotionProps, Reorder } from "framer-motion"
import React, { FC } from "react"
import { DraggableItem } from "./item"
import { cn } from "lib/utils"

type TDraggableList<T extends { id: string }> = {
  data: Array<T>
  /**
   * children element
   */
  element: FC<T>
  setData: (newOrder: T[]) => void
} & Omit<HTMLMotionProps<any>, "values">

export function DraggableList<T>({ data, element, setData, className, ...props }: TDraggableList<{ id: string } & T>) {
  return (
    <Reorder.Group
      {...props}
      axis="y"
      onReorder={setData}
      values={data}
      className={cn("flex w-full flex-col gap-4", className)}
    >
      {data.map((d, i) => (
        <DraggableItem key={d.id} data={d}>
          {element(d)}
        </DraggableItem>
      ))}
    </Reorder.Group>
  )
}
