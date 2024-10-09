// when try again, send the error to db
// add the handling error of send message to Admin
import { ButtonWrapper } from "components/button/button_v2"
import { HTMLAttributes } from "react"

type TRecovery = {
  error: any
  recoveryHandler: () => void
  backPath: string
} & HTMLAttributes<HTMLDivElement>
export function Recovery({ error, recoveryHandler, backPath, ...props }: TRecovery) {
  return (
    <div {...props} className="flex h-screen min-h-full w-full flex-col items-center justify-center gap-8">
      <span className="text-lg">Oops! Looks like something went wrong!{" "}</span>
      <span className="flex flex-row justify-evenly items-center gap-6">
        <ButtonWrapper onClick={recoveryHandler} state={"prev"} variant={"destructive"}>
          Try again
        </ButtonWrapper>
        <span>or</span>
        <ButtonWrapper onClick={recoveryHandler} state={"prev"} variant={"outline"}>
          Go Back to {backPath}
        </ButtonWrapper>
      </span>
      <pre className="whitespace-normal text-sm text-muted-foreground">{error.message}</pre>
    </div>
  )
}
