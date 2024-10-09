// add react query to upload with validating and pre url generated
import { twMerge } from "tailwind-merge"
import Image from "next/image"
import React, { createRef, Fragment } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { ButtonWrapper } from "../../button/button_v2"
import "../../../styles/transition.css"
import { CircleX, CloudUpload } from "lucide-react"

type TDropFileZone = { accepted: string } & React.InputHTMLAttributes<HTMLInputElement>

export function DropFileZone({ ...props }: TDropFileZone) {
  const id = React.useId()
  const ref = React.useRef<HTMLLabelElement>(null)
  const divRef = React.useRef<HTMLDivElement>(null)
  const [files, setFiles] = React.useState<Array<{ file: File; nodeRef: React.RefObject<HTMLSpanElement> }>>([])
  const [isDragging, setIsDragging] = React.useState(false)

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const target = Array.from(e.target.files)
        .filter((el) =>
          files.length > 0 ? files.map((file) => file.file.name).some((name) => name !== el.name) : true
        )
        .map((el) => {
          return { file: el, nodeRef: createRef<HTMLSpanElement>() }
        })

      setFiles((prev) => [...prev, ...target])
    }
  }
  const handleDrag: React.DragEventHandler = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDrop: React.DragEventHandler = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const target = Array.from(e.dataTransfer.files)
      .filter((el) => {
        const names = files.map((file) => file.file.name)
        console.log(names)
        return files.length > 0 ? !names.includes(el.name) : true
      })
      .map((el) => {
        return { file: el, nodeRef: createRef<HTMLSpanElement>() }
      })
    setFiles((prev) => [...prev, ...target])
  }
  const handleDragOver: React.DragEventHandler = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave: React.DragEventHandler = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const handleSubmit = () => {
    console.log(files)
  }

  return (
    <form className="flex w-full min-w-[320px] flex-col items-center justify-center gap-4" action={handleSubmit}>
      {/* drop zone */}
      <div
        className={twMerge(
          "dark:bg-dark-surface flex w-full flex-col items-center justify-center gap-4 p-8",
          "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600",
          isDragging ? "bg-gray-100 outline outline-1 outline-blue-600 dark:bg-gray-600 dark:outline-gray-200" : "",
          "outline-dashed outline-1 hover:outline-blue-600  dark:outline-gray-200"
        )}
        onClick={(e) => {
          if (!ref.current?.contains(e.target as Element) && !divRef.current?.contains(e.target as Element))
            ref.current?.click()
        }}
        onDragEnter={handleDrag}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {files?.length ?? 0 > 0 ? (
          <div ref={divRef} className="flex min-h-[200px] w-full flex-row gap-3 overflow-x-auto overflow-y-hidden pt-4">
            <TransitionGroup component={null}>
              {files.map((el, i) => {
                return (
                  <CSSTransition key={el.file.name} classNames="ymotion" timeout={500} nodeRef={el.nodeRef}>
                    <span className="relative max-h-[200px] min-w-[200px]" ref={el.nodeRef}>
                      <Image
                        alt="preview"
                        src={URL.createObjectURL(el.file)}
                        width={200}
                        height={200}
                        className="max-h-[200px] min-w-[200px]"
                      />
                      <ButtonWrapper
                        size={"icon"}
                        variant={"outline"}
                        className="absolute right-0 top-0 z-10 size-6 -translate-y-1/2 translate-x-1/2 rounded-full"
                        onClick={() => {
                          setFiles((prev) => prev.filter((_, index) => index !== i))
                        }}
                        state={"prev"}
                      >
                        <CircleX className="rounded-full" />
                      </ButtonWrapper>
                    </span>
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
          </div>
        ) : (
          <Fragment>
            <CloudUpload className="h-auto w-8 fill-background text-blue-500" />
            <p>Please Drop File or Click Here </p>
            <p>({props.accept ?? "image/png, image/jpeg"})</p>
          </Fragment>
        )}
        <label
          htmlFor={id}
          ref={ref}
          className="rounded-md bg-gray-200 p-2 px-4 hover:bg-gray-300 dark:bg-gray-500 dark:hover:bg-gray-400"
        >
          Add Files{" "}
        </label>
        <input
          type="file"
          id={id}
          multiple={props.multiple ?? false}
          accept={props.accept ?? "image/png, image/jpeg"}
          {...props}
          className="hidden w-36 outline-none ring-0 focus:outline-none focus:ring-0"
          onChange={handleAdd}
        />
      </div>
    </form>
  )
}
