import { ButtonWrapper } from "components/button/button_v2"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/card/card"
import { HandWriting } from "components/text-animation/hand_writing_v3"
import { cn } from "lib/utils"

type TSubscriptionStatus = {
  plan: "free" | "starter" | "pro"
  messages: Array<{ free: string; starter: string }>
}

export function SubscriptionStatus({ plan, messages, ...props }: TSubscriptionStatus) {
  return (
    <Card className={cn("w-full border-x-0", plan !== "pro" ? "h-[240px]" : "")}>
      <CardHeader className="z-10 pb-2">
        <CardTitle className="flex flex-row items-center justify-between text-base text-muted-foreground">
          Current Plan:{" "}
          <span
            className={cn(
              "border border-accent bg-primary text-primary-foreground",
              "rounded-sm px-2 text-base font-normal"
            )}
          >
            {plan}
          </span>
        </CardTitle>
        <CardDescription>free for some period</CardDescription>
        {plan !== "pro" ? (
          <ButtonWrapper state={"prev"} size="sm" variant={"secondary"}>
            Upgrade Your Plan
          </ButtonWrapper>
        ) : null}
      </CardHeader>
      <CardContent className="p-1 pb-2 ">
        <div className="bg-grid-bg bg-grid-paper bg-grid-size dark:bg-gray-100">
          {plan !== "pro" ? (
            <HandWriting
              texts={messages.map((m, i) => {
                return {
                  id: i === 0 ? "initial" : i.toString(),
                  text: plan === "free" ? m.free : m.starter,
                  fontSize: 22,
                  duration: 300,
                  offset: { x: 0, y: 30 },
                }
              })}
              fromTop={30}
              start
              isMultiLine={false}
              handSize="sm"
              className=""
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
