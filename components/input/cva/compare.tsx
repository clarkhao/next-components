import React from "react";
import { TCompare } from "../../../lib/zod";

type TCompareList = {
  data: TCompare[];
};

export function CompareList({ data }: TCompareList) {
  console.log(data);
  return (
    <>
      {data.map((el, index) => {
        return (
          <span
            key={`${el.kind}-${index}`}
            className="flex flex-row items-center justify-start gap-x-2"
          >
            <span
              className={[
                "h-2 w-2 rounded-full md:h-3 md:w-3",
                `${
                  el.value === true
                    ? "bg-destructive"
                    : el.value === false
                      ? "bg-primary"
                      : "bg-orange-400 dark:bg-orange-500"
                }`,
              ].join(" ")}
            ></span>
            <p className="text-xs">{el.message}</p>
          </span>
        );
      })}
    </>
  );
}
