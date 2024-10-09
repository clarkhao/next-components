import { X } from "lucide-react"
import React from "react"
import { CSSTransition } from "react-transition-group"
import "../../styles/transition.css"
import { cn } from "lib/utils"
import { ButtonWrapper } from "components/button/button_v2"

type TModal = {
  /**
   * children
   */
  children: React.ReactNode
  /**
   * title
   */
  title?: string
}

export const Modal = React.forwardRef<HTMLDialogElement, TModal & React.HTMLAttributes<HTMLDialogElement>>(
  ({ children, title, ...props }, ref) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null)
    React.useImperativeHandle(
      ref,
      () => {
        return {
          ...dialogRef.current!,
          showModal() {
            dialogRef.current?.showModal()
          },
          close() {
            dialogRef.current?.close()
          },
        }
      },
      []
    )
    return (
      <>
        <CSSTransition in={dialogRef.current?.open} timeout={300} classNames="scale">
          <dialog
            {...props}
            ref={dialogRef}
            className={cn(
              "fixed inset-0 z-50 m-auto max-h-full w-full max-w-md rounded-md border p-0 shadow-lg",
              "bg-popover text-popover-foreground"
            )}
          >
            <div className="relative max-h-96 overflow-auto rounded-lg">
              <ButtonWrapper
                className={cn("absolute right-1 top-1 outline-none")}
                variant={"ghost"}
                size={"icon"}
                onClick={() => dialogRef.current?.close()}
                state={"prev"}
              >
                <X size={16} />
                <span className="sr-only">Close modal</span>
              </ButtonWrapper>
              <div className="rounded-t border-b bg-muted px-6 py-4 text-muted-foreground">
                <h3 className="text-base font-semibold leading-none tracking-tight lg:text-xl">
                  {title ?? "Modal Title"}
                </h3>
              </div>
              <div className="bg-muted px-6 py-4 text-muted-foreground">{children}</div>
            </div>
          </dialog>
        </CSSTransition>
      </>
    )
  }
)

Modal.displayName = "Modal"
