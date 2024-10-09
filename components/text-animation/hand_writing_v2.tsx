import { cn } from "lib/utils"
import React, { HTMLAttributes } from "react"
import { useEffect, useRef } from "react"
import Vara from "vara"
import { z } from "zod"
function countSpaces(text: string): number {
  let spaceCount = 0
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      spaceCount++ // Increment the count for each space found
    }
  }
  return spaceCount
}
type TVaraText = {
  id: string
  text: string
}
const newInstance = (
  texts: Array<TVaraText>,
  fontSize: number = 24,
  container: string = "#vara-initial",
  isMultiLine: boolean = true,
  duration: number = 500
) => {
  return new Vara(
    container,
    // fonts
    // fonts/Pacifico/PacificoSLO.json
    // fonts/Parisienne/Parisienne.json
    // fonts/Satisfy/SatisfySL.json
    // fonts/Shadows-Into-Light/shadows-into-light.json
    "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
    texts.map((el) => {
      return {
        text: el.text,
        fontSize: fontSize,
        strokeWidth: 1.5,
        id: el.id,
        duration: duration * (el.text.length - countSpaces(el.text)),
        queued: true,
        x: (720) / (fontSize - 10), // Number, x coordinate of the text
        y: 0, // Number, y coordinate of the text
        fromCurrentPosition: {
          // Whether the x or y coordinate should be from its calculated position, ie the position if x or y coordinates were not applied
          x: true, // Boolean
          y: isMultiLine, // Boolean
        },
      }
    }),
    // global settings
    {
      fontSize: fontSize, // Number, size of the text
      strokeWidth: 1.5, // Width / Thickness of the stroke
      color: "black", // Color of the text
      textAlign: "left", // String, text align, accepted values are left,center,right
      autoAnimation: false, // Boolean, Whether to animate the text automatically
      queued: true, // Boolean, Whether the animation should be in a queue
      letterSpacing: 0,
    }
  )
}
function extractNumbers(input: string): number[] {
  const numberPattern = /-?\d+(\.\d+)?/g // Regex to match integers and floats, positive or negative
  const matches = input.match(numberPattern) // Extract all matches
  return matches ? matches.map(Number) : [] // Convert matches to numbers and return
}
function applyTransformToPath(pathData: string, ...transform: string[]): string {
  // Extract transform values
  const [dx1, dy1] = extractNumbers(transform[0]!)

  const [dx2, dy2, scale] = extractNumbers(transform[1] ?? "")
  // Split the path data into commands
  const commands = pathData.match(/[a-zA-Z][^a-zA-Z]*/g) || []
  // Process each command
  const transformedCommands = commands.map((cmd, i) => {
    if (i === 0 && !cmd.startsWith("z")) {
      const type = cmd[0]
      const points = cmd
        .slice(1)
        .trim()
        .split(/[\s,]+/)
        .map(Number)
      // Apply transform to each point
      for (let i = 0; i < points.length; i += 2) {
        points[i] = (dx1 + points[i]) * (scale ?? 1.0) + (dx2 ?? 0.0)
        points[i + 1] = (dy1 + points[i + 1]) * (scale ?? 1.0) + (dy2 ?? 0.0)
      }
      // Reconstruct the command
      return type?.toUpperCase() + " " + points.join(",")
    } else if (!cmd.startsWith("z")) {
      const type = cmd[0]
      const points = cmd
        .slice(1)
        .trim()
        .split(/[\s,]+/)
        .map(Number)
      // Apply transform to each point
      for (let i = 0; i < points.length; i += 2) {
        points[i] *= scale
        points[i + 1] *= scale
      }
      // Reconstruct the command
      return type + " " + points.join(",")
    } else {
      return cmd
    }
  })
  // Join the transformed commands back into a path string
  return transformedCommands.join(" ")
}
type THandWriting = {
  text: string
  fontSize: number
  duration: number
  fromTop: number
  isMultiLine: boolean
  handSize: "sm" | "md"
  start?: boolean
} & HTMLAttributes<HTMLDivElement>
export function HandWriting({
  text,
  fontSize,
  duration,
  fromTop,
  isMultiLine = true,
  handSize = "md",
  start,
  className,
  ...props
}: THandWriting) {
  // compensate time when meeting space, or "-"
  const [newLine, setNewLine] = React.useState<Array<{ lineNum: number; duration: number }>>([])
  // index controling the start animation time
  const [testPath, setPath] = React.useState<Array<string>>([])
  const instanceRef = useRef(null)
  const animateRef = useRef(null)
  const [toggle, setToggle] = React.useState(false)
  // validate the text characters
  // Create a schema that validates all characters are in the printable ASCII range (33 to 126)
  const printableAsciiSchema = z.string().refine(
    (value) => {
      return [...value].every((char) => {
        const asciiCode = char.charCodeAt(0)
        return asciiCode >= 32 && asciiCode <= 126
      })
    },
    {
      message: "All characters must be in the ASCII printable range (33 to 126).",
    }
  )
  // Example usage
  const result = printableAsciiSchema.safeParse(text)
  if (!result.success) {
    console.error("Error:", result.error)
    throw result.error
  }
  useEffect(() => {
    const initial = newInstance([{ id: "initial", text }], fontSize, "#vara-initial", true, duration)
    // Attach an event listener to get path details after drawing
    initial.ready(() => {
      // prepare data
      console.log("start to prepare data")
      const { characters, container } = initial.get("initial")
      const paths: string[] = []
      ;(container as Element).childNodes.forEach((group) => {
        let path = ""
        group?.childNodes.forEach((g) => {
          const scaleStr = (g as Element).getAttribute("transform")
          g.childNodes.forEach((p) => {
            const d = (p as Element).getAttribute("d")
            const transform = (p as Element).getAttribute("transform")
            const newPath = applyTransformToPath(d!, transform!, scaleStr!)
            path += ` ${newPath}`
          })
        })
        paths.push(path)
      })
      setPath(paths)
      const translates: number[] = []
      characters.forEach((c: Element) => {
        const transform = c.getAttribute("transform")
        const x = extractNumbers(transform ?? "")[0]
        translates.push(x!)
      })
      const lineNum = [{ lineNum: 0, duration: 0 }]
      translates.forEach((el, i) => {
        if (el < (translates[i - 1] ?? 0) && el < (translates[i + 1] ?? 0.0)) {
          lineNum.push({ lineNum: i, duration: 0 })
        }
      })
      const lineDuration = lineNum.map((el, i) => {
        const part = text.slice(el.lineNum, lineNum[i + 1]?.lineNum ?? text.length)
        const dur = duration * 0.001 * (part.length - countSpaces(part))
        return { ...el, duration: dur }
      })
      console.log(lineDuration)
      setNewLine(lineDuration)
    })
  }, [])

  useEffect(() => {
    const animate = (i: number) => {
      try {
        const outer = document.querySelectorAll("#vara-container .outer")
        const g = outer[i]?.querySelector("#vara-container g")
        const path =
          document.querySelector(`#animate-motion-path-${i}`) ??
          document.createElementNS("http://www.w3.org/2000/svg", "path")
        path.setAttribute("d", testPath[i]!)
        //path.setAttribute("transform", "translate(100.5231514522767493,0)  ")
        path.setAttribute("stroke-width", "0.5")
        path.setAttribute("fill", "none")
        path.setAttribute("stroke", "transparent")
        path.setAttribute("stroke-linecap", "round")
        path.setAttribute("stroke-linejoin", "round")
        path.setAttribute("id", `animate-motion-path-${i}`)
        g?.appendChild(path)
        // Create the circle element
        const image =
          document.querySelector(`#animate-motion-image-${i}`) ??
          document.createElementNS("http://www.w3.org/2000/svg", "image")
        image.setAttributeNS(null, "href", "/handwriting.svg") // Set the image source
        image.setAttributeNS(null, "x", handSize === "md" ? "-12" : "-8") // Initial x position
        image.setAttributeNS(null, "y", handSize === "md" ? "-108" : "-70") // Initial y position
        image.setAttributeNS(null, "width", handSize === "md" ? "120" : "80") // Image width
        image.setAttributeNS(null, "height", handSize === "md" ? "120" : "80") // Image height
        image.setAttribute("id", `animate-motion-image-${i}`)
        animateRef.current =
          document.querySelector(`#animate-motion-${i}`) ??
          document.createElementNS("http://www.w3.org/2000/svg", "animateMotion")
        animateRef.current.setAttribute("dur", `${newLine[i]?.duration}s`) // Duration of the animation
        animateRef.current.setAttribute("repeatCount", "1") // No repetition
        animateRef.current.setAttribute("fill", "freeze")
        animateRef.current.setAttribute("id", `animate-motion-${i}`)
        //animateRef.current.setAttribute("begin", `${durRef.current}s`)
        animateRef.current.beginElement()
        // Attach the path to the animateMotion element
        //const mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath")
        //mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", `${path.id}`) // Reference the path
        animateRef.current.setAttribute("path", testPath[i]!)
        image?.appendChild(animateRef.current)
        //animateMotion.appendChild(mpath)
        g?.appendChild(image)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      if (newLine.length > 0 && start && toggle !== undefined) {
        const initialSvg = document.querySelector("#vara-initial svg")
        initialSvg?.remove()
        // start the right one
        instanceRef.current = newInstance(
          newLine.map((el, i) => {
            return {
              id: i.toString(),
              text: text.slice(el.lineNum, newLine[i + 1]?.lineNum ?? text.length).trim(),
            }
          }),
          fontSize,
          "#vara-container",
          isMultiLine,
          duration
        )
        instanceRef.current.ready(() => {
          // get the first text step, following text steps need animationEnd event
          let firstHeight = 0.0
          let lastHeight = 0.0
          // set relative position
          const svg = document.querySelector("#vara-container svg")
          svg?.childNodes.forEach((c, i) => {
            console.log(c)
            const transform = (c as Element).getAttribute("transform")
            console.log(transform)
            const translates = transform?.match(/-?\d+(\.\d+)?/g)?.map((el) => parseFloat(el))
            if (i === 0) {
              firstHeight = translates![1]! + fromTop
            }
            const newTranslates: number[] = [
              translates![0]!,
              isMultiLine ? firstHeight + (fontSize + 20) * i : firstHeight,
            ]
            lastHeight = newTranslates[newTranslates.length - 1]! + fontSize + fromTop
            ;(c as Element).setAttribute("transform", `translate(${newTranslates[0]} ${newTranslates[1]})`)
          })
          svg?.setAttribute("height", `${lastHeight}`)
          animate(0)
          instanceRef.current.draw("0")

          instanceRef.current.animationEnd((i, g) => {
            const groupIndex = parseInt(i as string)
            console.log(`group index: ${i}`)
            const nextIndex = groupIndex + 1
            console.log(g.container)
            if (!isMultiLine) {
              g.container.style.transition = "opacity 500ms 500ms"
              g.container.style.opacity = 0
            }
            // find the last point of last line
            // find the first point of next line
            const lastLine = g.container.getBoundingClientRect()
            const lastCoord = [lastLine.right, lastLine.bottom]
            // key point
            const images = document.querySelectorAll("#vara-container image")
            images.forEach((m) => m.setAttribute("width", "0"))
            const data = instanceRef.current.get(`${nextIndex >= newLine.length ? 0 : nextIndex}`)
            const outer = data.container
            const nextLine = outer.getBoundingClientRect()
            const nextCoord = [nextLine.left, nextLine.top]
            const path =
              document.querySelector(`#animate-over-${groupIndex}`) ??
              document.createElementNS("http://www.w3.org/2000/svg", "path")
            // Create a line path from point1 to point2
            const pathData =
              nextIndex >= newLine.length && isMultiLine
                ? `M ${lastCoord[0]} ${lastCoord[1]} L ${lastCoord[0]} ${lastCoord[1]}`
                : `M ${lastCoord[0]} ${lastCoord[1]} L ${nextCoord[0]} ${nextCoord[1]}`
            path.setAttribute("d", pathData)
            path.setAttribute("fill", "none") // No fill for the path itself
            path.setAttribute("stroke", "transparent")
            path.setAttribute("id", `animate-over-${groupIndex}`)
            // Make the path invisible
            const svgContainer = document.querySelector("#vara-container svg")
            svgContainer?.appendChild(path)
            // Create the circle element
            const image =
              document.querySelector(`#animate-over-image-${groupIndex}`) ??
              document.createElementNS("http://www.w3.org/2000/svg", "image")
            image.setAttributeNS(null, "href", "/handwriting.svg") // Set the image source
            image.setAttributeNS(null, "x", handSize === "md" ? "-12" : "-8") // Initial x position
            image.setAttributeNS(null, "y", handSize === "md" ? "-108" : "-70") // Initial y position
            image.setAttributeNS(null, "width", handSize === "md" ? "120" : "80") // Image width
            image.setAttributeNS(null, "height", handSize === "md" ? "120" : "80") // Image height
            image.setAttribute("id", `animate-over-image-${groupIndex}`)
            //image.setAttribute("transform", `scale(${scale})`)
            // Step 4: Create the animateMotion element
            const animateMotion =
              document.querySelector(`#animate-over-motion-${groupIndex}`) ??
              document.createElementNS("http://www.w3.org/2000/svg", "animateMotion")
            animateMotion.setAttribute("dur", "1s") // Duration of the animation
            animateMotion.setAttribute("repeatCount", "1") // No repetition
            animateMotion.setAttribute("path", pathData)
            animateMotion.setAttribute("id", `animate-over-motion-${groupIndex}`)
            // Attach the path to the animateMotion element
            image.appendChild(animateMotion)
            svgContainer?.appendChild(image)
            animateMotion.beginElement()
            animateMotion.addEventListener("endEvent", () => {
              const image = document.querySelector(`#animate-over-image-${i}`)
              image?.remove()
              // start to draw
              if (nextIndex >= newLine.length) {
                if (isMultiLine) return
                else {
                  const svg = document.querySelector("#vara-container svg")
                  svg?.remove()
                  setToggle(!toggle)
                }
              } else {
                instanceRef.current.draw(`${nextIndex}`)
                animate(nextIndex)
                animateRef.current.beginElement()
              }
            })
          })
        })
        //delete all circles after animation
      } else if (newLine.length > 0 && !start) {
        instanceRef.current?.animationEnd(null)
        animateRef.current = null
        const svg = document.querySelector("#vara-container svg")
        svg?.remove()
      }
    } catch (err) {
      console.log(err)
    }
  }, [newLine, start, toggle])

  return (
    <>
      <div id="vara-initial" className="w-full bg-transparent"></div>
      <div id="vara-container" className={cn("w-full", className)} {...props}></div>
    </>
  )
}
