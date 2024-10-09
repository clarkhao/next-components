import { ButtonWrapper } from "components/button/button_v2"
import { CardContent, CardHeader } from "components/card/card"
import { AppleIcon, GoogleIcon } from "components/icons/icons"
import { Facebook } from "lucide-react"
type TLogin = {
  handleSignin: () => void
}

export function Login({ handleSignin }: TLogin) {
  return (
    <>
      <CardHeader className="flex w-full flex-col items-center justify-center space-y-4">
        <span>BrandIcon</span>
        <h1 className="text-xl">Signin to continue</h1>
      </CardHeader>
      <CardContent className="flex w-full flex-col items-center justify-center gap-4">
        <ButtonWrapper
          state={"prev"}
          variant={"default"}
          size={"default"}
          className="relative w-full bg-foreground text-background hover:bg-gray-600 dark:hover:bg-gray-200"
          onClick={handleSignin}
        >
          <GoogleIcon className=" absolute left-2 size-4 rounded-full fill-white stroke-white" />
          <span className="pl-8">Continue with Google</span>
        </ButtonWrapper>
        <ButtonWrapper state={"prev"} variant={"outline"} size={"default"} className="relative w-full">
          <AppleIcon className=" absolute left-2 size-4 rounded-full fill-foreground stroke-black" />
          <span className="pl-8">Continue with Apple</span>
        </ButtonWrapper>
        <ButtonWrapper
          state={"prev"}
          variant="outline"
          size={"default"}
          className="relative w-full bg-orange-300 hover:bg-orange-200"
        >
          <Facebook className=" absolute left-2 size-5 rounded-full bg-blue-600 fill-white stroke-none" />
          <span className="pl-8">Continue with Facebook</span>
        </ButtonWrapper>
      </CardContent>
    </>
  )
}
