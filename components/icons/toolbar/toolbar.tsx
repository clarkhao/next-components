import { ButtonWrapper } from "components/button/button_v2"
import { Tooltip } from "components/tooltip/tooltip_v1"
import { ChevronsDownUp, ChevronsUpDown, CirclePlus } from "lucide-react"

type TToolbar = {
  folded: boolean
  setFolded: () => void
}

export function Toolbar({ folded, setFolded }: TToolbar) {
  return (
    <div className="flex w-fit flex-row gap-1 p-0 shadow-sm">
      <ButtonWrapper state={"prev"} variant={"ghost"} size={"default"} animated={false}>
        <CirclePlus />
        <b>Add Text</b>
      </ButtonWrapper>
      <Tooltip
        centered
        isLeft
        pos={"bottom"}
        bgColor={"dark"}
        tips={() => (
          <p className="flex h-6 w-[80px] items-center justify-center text-sm">{folded ? "unfold all" : "fold all"}</p>
        )}
      >
        {folded ? <ChevronsDownUp onClick={() => setFolded()} /> : <ChevronsUpDown onClick={() => setFolded()} />}
      </Tooltip>
    </div>
  )
}
