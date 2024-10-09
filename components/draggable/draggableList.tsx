import { Reorder } from "framer-motion"
import React, { FC, Fragment } from "react"
import { DraggableItem } from "./item"

type TDraggableList<T extends { id: string }> = {
  data: Array<T>
  /**
   * children element
   */
  element: FC<T>
  setData: (newOrder: T[]) => void
}

export function DraggableList<T>({ data, element, setData, ...props }: TDraggableList<{ id: string } & T>) {
  return (
    <Reorder.Group axis="y" onReorder={setData} values={data} className="flex w-full flex-col gap-4">
      {data.map((d, i) => (
        <DraggableItem key={d.id} data={d}>
          {element(d)}
        </DraggableItem>
      ))}
    </Reorder.Group>
  )
}
