import React from "react"
import { TPwdMessage } from "./errors"

type TCompareList = {
  data: TPwdMessage[]
}

export function RequirementList({ data }: TCompareList) {
  return (
    <>
      {data.map((el, index) => {
        return (
          <span key={`${el.msg}-${index}`} className="flex flex-row items-center justify-start gap-x-2">
            <span
              className={[
                "h-2 w-2 rounded-full md:h-3 md:w-3",
                `${el.pass === false ? "bg-destructive" : "bg-primary"}`,
              ].join(" ")}
            ></span>
            <p className="text-xs">{el.msg}</p>
          </span>
        )
      })}
    </>
  )
}
