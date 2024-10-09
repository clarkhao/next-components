import { cn } from "lib/utils"
import { CreditCard, Dot, Film, Gift, Rocket, ShieldX } from "lucide-react"
import { HTMLAttributes } from "react"

type TNotificationItem = {
  type: "sys" | "sub" | "work" | "err" | "promotion"
  title: string
  msg: string
  read: boolean
  time: string
} & HTMLAttributes<HTMLDivElement>

export function NotificationItem({ type, title, msg, read, time, className, ...props }: TNotificationItem) {
  const icon = () => {
    switch (type) {
      case "sys":
        return <Rocket className="size-5" />
      case "sub":
        return <CreditCard className="size-5" />
      case "work":
        return <Film className="size-5" />
      case "err":
        return <ShieldX className="size-5" />
      case "promotion":
        return <Gift className="size-5" />
      default:
        return <Film className="size-5" />
    }
  }
  return (
    <div className={cn("flex w-full flex-col items-start justify-start gap-2", className)} {...props}>
      <span className="flex flex-row items-center justify-start gap-2">
        <span className={cn("inline-block size-2 rounded-full", read ? "bg-gray-400" : "bg-primary")}></span>
        <h2>{title}</h2>
      </span>
      <span className={cn(read ? "text-gray-400" : "text-foreground", "flex flex-col pl-4")}>
        <p>{msg}</p>
        <span className="flex flex-row items-center justify-start gap-2">
          {icon()}
          <p className="text-gray-400">{time}</p>
        </span>
      </span>
    </div>
  )
}
