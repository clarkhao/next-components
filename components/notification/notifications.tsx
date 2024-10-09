import { Bell } from "lucide-react"
import { Badge } from "components/badge/badge_v1"
import { ButtonWrapper } from "components/button/button_v2"
import React from "react"
import { cn } from "lib/utils"
import { IBadge } from "components/badge/badge"

interface INotificationIcon extends Omit<IBadge, "children"> {}

export const NotificationIcon = React.forwardRef<HTMLDivElement, INotificationIcon>(
  ({ num, className, description, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        {...props}
        num={num}
        intent="primary"
        isDot={false}
        isAnimated
        className={className}
        description={description}
      >
        <ButtonWrapper
          size="icon"
          variant="secondary"
          disabled={false}
          state={"prev"}
          className={cn("size-9 rounded-full hover:bg-accent")}
        >
          <Bell className="h-6" />
        </ButtonWrapper>
      </Badge>
    )
  }
)
NotificationIcon.displayName = "NotificationIcon"
