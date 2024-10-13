import { Reorder, useDragControls, useMotionValue } from "framer-motion"
import { Grip, Minus } from "lucide-react"
import { useRaisedShadow } from "./useRaisedShadow"

type TDraggableItem<T> = {
  children: React.ReactNode
  data: T
}

export function DraggableItem<T>({ children, data }: TDraggableItem<any>) {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const dragControls = useDragControls()
  return (
    <Reorder.Item value={data} id={data.id} style={{ boxShadow, y }} dragListener={false} dragControls={dragControls}>
      <div className="flex w-full flex-row items-start justify-center gap-4">
        <span className="order-1 ">
          <Grip
            className="h-auto w-10 cursor-pointer rounded-sm p-2 hover:bg-accent"
            onPointerDown={(event) => dragControls.start(event)}
          />
          
        </span>
        <span className="min-h-10 w-full bg-gray-50">{children}</span>
      </div>
    </Reorder.Item>
  )
}
