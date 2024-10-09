import { createTextureWithTWGL, createTransMatrix, pixelScreenTrans, prepare } from "lib/canvas/draw"
import { createTextureWithGL } from "lib/canvas/original"
import { cn } from "lib/utils"
import React, { HTMLAttributes } from "react"
import * as twgl from "twgl.js"

type TWebgl = {
  vsSrc: string
  fsSrc: Array<string>
  // if undefined, take all screen
  size?: { width: number; height: number }
  imageSrc?: string
} & HTMLAttributes<HTMLCanvasElement>

export function CanvasWebgl({ vsSrc, fsSrc, imageSrc, className, size, ...props }: TWebgl) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const [msg, setMsg] = React.useState("")
  const frameRef = React.useRef<number>(0)
  const moveRef = React.useRef<Array<number>>([0, 0])
  const downRef = React.useRef<Array<number>>([0, 0])
  
  React.useEffect(() => {
    if (!ref.current) {
      setMsg("canvas not found")
      return
    }
    const gl = ref.current.getContext("webgl2")
    if (!gl) {
      setMsg("WebGL not supported")
      return
    }
    ref.current!.width = size?.width ?? window.innerWidth
    ref.current!.height = size?.height ?? window.innerHeight
    const plainArrays = {
      position: {
        numComponents: 3,
        data: [
          -gl.canvas.width / 2,
          gl.canvas.height / 2,
          0,
          -gl.canvas.width / 2,
          -gl.canvas.height / 2,
          0,
          gl.canvas.width / 2,
          -gl.canvas.height / 2,
          0,
          gl.canvas.width / 2,
          gl.canvas.height / 2,
          0,
        ],
      },
      texcoord: {
        numComponents: 2,
        data: [0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0],
      },
      indices: {
        numComponents: 3,
        data: [0, 1, 2, 2, 3, 0],
      },
      modelId: {
        numComponents: 1,
        data: [1],
      },
    }
    const matrix = createTransMatrix()
    //creat textures
    const textures: Array<WebGLTexture> = []
    const framebuffers: Array<WebGLFramebuffer> = []
    for (let i = 0; i < 2; i++) {
      const texture: WebGLTexture | null = createTextureWithGL(gl)
      // make the texture the same size as the image
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.width, gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      if (texture) textures.push(texture)
      const fbo = gl.createFramebuffer()
      framebuffers.push(fbo!)
    }
    // mouse
    const mouseDownHandler = (e: MouseEvent) => {
      const [x, y] = pixelScreenTrans([e.clientX, e.clientY], [gl.canvas.width, gl.canvas.height])
      downRef.current = [Math.abs(x), -1 * Math.abs(y)]
      frameRef.current = 0
    }
    const mouseUpHandler = (e: MouseEvent) => {
      const [x, y] = pixelScreenTrans([e.clientX, e.clientY], [gl.canvas.width, gl.canvas.height])
      downRef.current = [-1 * Math.abs(x), Math.abs(y)]
    }
    const mouseMoveHandler = (e: MouseEvent) => {
      const [x, y] = pixelScreenTrans([e.clientX, e.clientY], [gl.canvas.width, gl.canvas.height])
      moveRef.current = [x!, y!]
    }

    ref.current?.addEventListener("mousedown", mouseDownHandler)
    ref.current?.addEventListener("mouseup", mouseUpHandler)
    ref.current.addEventListener("mousemove", mouseMoveHandler)
    const draw = async (pic?: HTMLImageElement) => {
      const isMulti = fsSrc.length > 1
      const programInfo = twgl.createProgramInfo(gl, [vsSrc, fsSrc[0]!])
      if (!programInfo.program) {
        setMsg("Unable to initialize the shader program: ")
        return
      }
      const bufferInfo = twgl.createBufferInfoFromArrays(gl, plainArrays)
      let texture: WebGLTexture
      if (pic) texture = createTextureWithTWGL(gl, pic)

      const render = (time: number) => {
        prepare(gl)
        gl.useProgram(programInfo.program)
        twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
        // buffer render
        if (isMulti) {
          gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffers[frameRef.current % 2]!)
          gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            textures[frameRef.current % 2]!,
            0
          )
          gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        }
        const uniforms = {
          iResolution: [gl.canvas.width, gl.canvas.height],
          u_matrix: matrix,
          iFrame: frameRef.current,
          iTime: time * 0.001,
          iChannel0: texture,
          iChannel1: texture,
          // mouse pixel coords. xy: current (if MLB down), zw: click
          iMouse: [...moveRef.current, ...downRef.current],
        }
        twgl.setUniforms(programInfo, uniforms)
        twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES, bufferInfo.numElements)
        // final draw
        if (isMulti) {
          const finalProgramInfo = twgl.createProgramInfo(gl, [vsSrc, fsSrc[1]!])
          gl.useProgram(finalProgramInfo.program)
          twgl.setBuffersAndAttributes(gl, finalProgramInfo, bufferInfo)
          gl.bindFramebuffer(gl.FRAMEBUFFER, null)
          gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
          const finalUniforms = {
            iResolution: [gl.canvas.width, gl.canvas.height],
            u_matrix: matrix,
            iTime: time * 0.001,
            iFrame: frameRef.current,
            iChannel0: textures[frameRef.current % 2],
            iChannel1: texture,
            iMouse: [...moveRef.current, ...downRef.current],
          }
          twgl.setUniforms(finalProgramInfo, finalUniforms)
          twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES, bufferInfo.numElements)
        }
        frameRef.current++
        requestAnimationFrame(render)
      }
      requestAnimationFrame(render)
    }
    if (imageSrc) {
      const image = new Image()
      image.crossOrigin = "anonymous" // for cors
      image.src = imageSrc ?? "" // in the same domain
      image.onload = function () {
        draw(image)
      }
    } else {
      draw()
    }
    return () => {
      ref.current?.removeEventListener("click", mouseDownHandler)
      ref.current?.removeEventListener("mouseup", mouseUpHandler)
      ref.current?.removeEventListener("mousemove", mouseMoveHandler)
    }
  }, [ref.current?.width])
  if (msg) return <div className="flex min-h-screen w-full items-center justify-center text-2xl">{msg}</div>
  return <canvas ref={ref} {...props} className={cn("m-0 h-full w-full p-0", className)}></canvas>
}
