import React from "react"
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
const newInstance = (texts: Array<TVaraText>, fontSize: number = 24, container: string = "#vara-initial") => {
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
        duration: 500 * (el.text.length - countSpaces(el.text)),
        queued: true,
        x: 720 / fontSize, // Number, x coordinate of the text
        y: 0, // Number, y coordinate of the text
        fromCurrentPosition: {
          // Whether the x or y coordinate should be from its calculated position, ie the position if x or y coordinates were not applied
          x: true, // Boolean
          y: true, // Boolean
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
function extractTranslateValues(transformStr: string): number {
  // Regular expression to match the translate values
  const translateRegex = /translate\(\s*([+-]?\d*\.?\d+)\s*,\s*([+-]?\d*\.?\d+)\s*\)/

  // Apply the regular expression to the string
  const match = transformStr.match(translateRegex)

  // If there's a match, return the x and y values as numbers
  if (match) {
    const x = parseFloat(match[1] ?? "0.0")
    return x
  }

  // If no match is found, return backup
  return 0
}
type THandWriting = {
  text: string
  fontSize: number
  fromTop: number
  start?: boolean
}
export function HandWriting({ text, fontSize, fromTop, start, ...props }: THandWriting) {
  // compensate time when meeting space, or "-"
  const durRef = useRef(0)
  // the g element containing path & circle
  const gRef = useRef<SVGGElement>(null)
  // animationMotion
  const amRef = useRef<SVGAnimateMotionElement | null>(null)
  const [newLine, setNewLine] = React.useState<Array<{ lineNum: number; duration: number }>>([])
  // index controling the start animation time
  const indexRef = useRef<number>(0)
  // special characters index like "-"
  const [sIndex, setSIndex] = React.useState<number[]>([])
  const specials = ["-", "!", ",", "'"]
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
    const indexes: number[] = []
    text
      .split("")
      .filter((t) => t !== " ")
      .forEach((t, i) => {
        if (specials.some((s) => s === t)) {
          indexes.push(i)
        }
      })
    setSIndex(indexes)
    const initial = newInstance([{ id: "initial", text }], fontSize)
    // Attach an event listener to get path details after drawing
    initial.ready(() => {
      // prepare data
      console.log("start to prepare data")
      const { characters } = initial.get("initial")
      const translates: number[] = []
      characters.forEach((c: Element) => {
        const transform = c.getAttribute("transform")
        const x = extractTranslateValues(transform ?? "")
        translates.push(x)
      })
      const lineNum = [{ lineNum: 0, duration: 0 }]
      translates.forEach((el, i) => {
        if (el < (translates[i - 1] ?? 0) && el < (translates[i + 1] ?? 0.0)) {
          lineNum.push({ lineNum: i, duration: 0 })
        }
      })
      const lineDuration = lineNum.map((el, i) => {
        const part = text.slice(el.lineNum, lineNum[i + 1]?.lineNum ?? text.length)
        const duration = 0.5 * (part.length - countSpaces(part))
        return { ...el, duration }
      })
      setNewLine(lineDuration)
    })
  }, [])

  useEffect(() => {
    const animateEnd = () => {
      try {
        const images = document.querySelectorAll("image")
        images.forEach((image) => {
          image.setAttribute("width", "0")
        })
        // when next path is space
        while (gRef.current?.querySelector("path")?.getAttribute("d")?.startsWith("M0")) {
          console.log("here")
          durRef.current += 0.12
          // next id, change here
          gRef.current = gRef.current?.nextElementSibling
          console.log(gRef.current)
        }

        if (gRef.current) {
          console.log("continue here")
          //const paths = gRef.current?.querySelectorAll("path")
          const path = gRef.current?.querySelector("path")
          // what if there're multi path in g
          const d = path?.getAttribute("d") ?? ""
          const transform = path?.getAttribute("transform")
          // Create the circle element
          const image = document.createElementNS("http://www.w3.org/2000/svg", "image")
          image.setAttributeNS(null, "href", "/handwriting.svg") // Set the image source
          image.setAttributeNS(null, "x", "-12") // Initial x position
          image.setAttributeNS(null, "y", "-108") // Initial y position
          image.setAttributeNS(null, "width", "120") // Image width
          image.setAttributeNS(null, "height", "120") // Image height
          image.setAttribute("transform", transform!)
          // Create the animateMotion element
          amRef.current = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion")
          //const isSpecial = sIndex.some((s) => s === indexRef.current)
          amRef.current.setAttribute("dur", "0.5s")
          amRef.current.setAttribute("repeatCount", "1")
          amRef.current.setAttribute("fill", "freeze")
          amRef.current.setAttribute("path", d)
          amRef.current.addEventListener("endEvent", animateEnd)
          image.appendChild(amRef.current)
          //const greater = sIndex.filter((s) => indexRef.current > s).length
          console.log(`index: ${indexRef.current}`)
          amRef.current.setAttribute("begin", `${indexRef.current * 0.5 + durRef.current}s`)
          if (!d.startsWith("M0")) {
            amRef.current.beginElement()
            gRef.current?.appendChild(image)
          }
          
          gRef.current = gRef.current?.nextElementSibling
          indexRef.current++
        }
      } catch (err) {
        console.error(gRef.current)
        console.error(err)
      }
    }
    if (newLine.length > 0 && start) {
      indexRef.current = 0
      const initialSvg = document.querySelector("svg")
      initialSvg?.remove()
      // start the right one
      const instance = newInstance(
        newLine.map((el, i) => {
          return { id: i.toString(), text: text.slice(el.lineNum, newLine[i + 1]?.lineNum ?? text.length) }
        }),
        fontSize,
        "#vara-container"
      )
      instance.ready(() => {
        // get the first text step, following text steps need animationEnd event
        const data = instance.get("0")
        const outer = data.container
        let firstHeight = 0.0
        let lastHeight = 0.0
        // set relative position
        const svg = document.querySelector("svg")
        svg?.childNodes.forEach((c, i) => {
          const transform = (c as Element).getAttribute("transform")
          const translates = transform?.match(/-?\d+(\.\d+)?/g)?.map((el) => parseFloat(el))
          console.log(translates)
          if (i === 0) {
            firstHeight = translates![1]! + fromTop
          }
          const newTranslates: number[] = [translates![0]!, firstHeight + (fontSize + 20) * i]
          lastHeight = newTranslates[newTranslates.length - 1]! + fontSize + fromTop
          ;(c as Element).setAttribute("transform", `translate(${newTranslates[0]} ${newTranslates[1]})`)
        })
        svg?.setAttribute("height", `${lastHeight}`)
        //instance.setPosition(outer, { y: 50 }, { x: false, y: true })
        const inner = outer?.querySelector("g")
        gRef.current = inner?.querySelector("g")
        instance.draw("0")
        animateEnd()

        instance.animationEnd((i, g) => {
          const groupIndex = parseInt(i as string)
          console.log(`group index: ${i}`)
          const part = text.slice(newLine[groupIndex]?.lineNum, newLine[groupIndex + 1]?.lineNum ?? text.length)
          if (newLine.length <= groupIndex + 1 || indexRef.current + 1 < part.length - countSpaces(part)) return
          // find the last point of last line
          // find the first point of next line
          amRef.current?.removeEventListener("endEvent", animateEnd)
          amRef.current = null
          durRef.current += newLine[groupIndex]?.duration!
          const lastLine = g.container.getBoundingClientRect()
          const lastCoord = [lastLine.right, lastLine.bottom]
          // key point
          const images = document.querySelectorAll("image")
          images.forEach((m) => m.setAttribute("width", "0"))
          const data = instance.get(`${groupIndex + 1}`)
          const outer = data.container
          const nextLine = outer.getBoundingClientRect()
          const nextCoord = [nextLine.left, nextLine.top]
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
          const transform = g.characters[0]?.getAttribute("transform")
          const match = transform?.match(/scale\(([\d.]+)\)/)
          const scale = parseFloat(match[1])
          // Create a line path from point1 to point2
          const pathData = `M ${lastCoord[0]} ${lastCoord[1]} L ${nextCoord[0]} ${nextCoord[1]}`
          path.setAttribute("d", pathData)
          path.setAttribute("fill", "none") // No fill for the path itself
          path.setAttribute("stroke", "transparent") // Make the path invisible
          path.setAttribute("id", `motion-${i}`)
          const svgContainer = document.querySelector("svg")
          svgContainer?.appendChild(path)
          // Create the circle element
          const image = document.createElementNS("http://www.w3.org/2000/svg", "image")
          image.setAttributeNS(null, "href", "/handwriting.svg") // Set the image source
          image.setAttributeNS(null, "x", "-12") // Initial x position
          image.setAttributeNS(null, "y", "-108") // Initial y position
          image.setAttributeNS(null, "width", "120") // Image width
          image.setAttributeNS(null, "height", "120") // Image height
          image.setAttribute("transform", `scale(${scale})`)
          // Step 4: Create the animateMotion element
          const animateMotion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion")
          animateMotion.setAttribute("dur", "0.5s") // Duration of the animation
          animateMotion.setAttribute("repeatCount", "1") // No repetition
          // Attach the path to the animateMotion element
          const mpath = document.createElementNS("http://www.w3.org/2000/svg", "mpath")
          mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${path.id}`) // Reference the path
          animateMotion.appendChild(mpath)
          image.appendChild(animateMotion)
          svgContainer?.appendChild(image)
          animateMotion.addEventListener("endEvent", () => {
            indexRef.current = 0
            durRef.current += 0.5

            const inner = outer?.querySelector("g")
            gRef.current = inner?.querySelector("g")
            // start to draw
            instance.draw(`${groupIndex + 1}`)
            animateEnd()
          })
          animateMotion.beginElement()
        })
      })
      //delete all circles after animation
    } else if (newLine.length > 0 && !start) {
      const svg = document.querySelector("#vara-container")
      svg?.remove()
      indexRef.current = 0
      durRef.current = 0.0
      gRef.current = null
      amRef.current?.removeEventListener("endEvent", animateEnd)
      amRef.current = null
    }
    return () => {
      amRef.current?.removeEventListener("endEvent", animateEnd)
    }
  }, [newLine, start])

  return (
    <>
      <div id="vara-initial" className="w-[108%] bg-transparent"></div>
      <div id="vara-container" className="w-[108%]"></div>
    </>
  )
}
