import * as twgl from "twgl.js"

export const drawRectangle = (origin: Array<number>, length: number, width: number) => {
  const originX = origin[0] ?? 0
  const originY = origin[1] ?? 0
  const rectangle = [
    // double triangle draw a rectangle
    originX - length / 2,
    originY - width / 2,
    originX - length / 2,
    originY + width / 2,
    originX + length / 2,
    originY + width / 2,
    originX + length / 2,
    originY - width / 2,
  ]
  return { data: rectangle }
}

export const prepare = (gl: WebGLRenderingContext) => {
  twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  //gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.CULL_FACE) // permit to draw only clw triangle or counter clw triangle
  gl.enable(gl.DEPTH_TEST)
}

export const createTextureWithTWGL = (gl: WebGLRenderingContext, image: HTMLImageElement): WebGLTexture => {
  const texture = twgl.createTexture(gl, {
    src: image,
    min: gl.NEAREST,
    mag: gl.NEAREST,
    wrapS: gl.CLAMP_TO_EDGE,
    wrapT: gl.CLAMP_TO_EDGE,
    level: 0,
    internalFormat: gl.RGBA,
    format: gl.RGBA,
  })

  return texture
}

export const fromTopLeftToMiddle = (x: number, y: number, w: number, h: number) => {
  return [x - w / 2, h / 2 - y]
}
// determine if the point is inside the shape
export function isInsideShape(v: Array<number>, arrays: twgl.Arrays) {
  let inside = false
  const [x, y] = v
  const position = (arrays.position as twgl.FullArraySpec).data as Array<number>
  const indices = (arrays.indices as twgl.FullArraySpec).data as Array<number>
  const extendedPosition: Array<number> = []
  indices.forEach((value) => {
    extendedPosition.push(position[value * 3]!)
    extendedPosition.push(position[value * 3 + 1]!)
    extendedPosition.push(position[value * 3 + 2]!)
  })
  const points = extendedPosition.reduce(
    (acc, cur, index) => {
      if (index % 3 === 0) {
        acc.push([cur, extendedPosition[index + 1]!, extendedPosition[index + 2]!])
      }
      return acc
    },
    [] as Array<Array<number>>
  )
  const triPoints = points.reduce(
    (acc, cur, index) => {
      if (index % 3 === 0) {
        acc.push([cur, points[index + 1]!, points[index + 2]!])
      }
      return acc
    },
    [] as Array<Array<Array<number>>>
  )
  for (let i = 0; i < triPoints.length && !inside; i++) {
    if (isPointInsideTriangle([x!, y!], triPoints[i]!)) {
      inside = true
    }
  }
  return inside
}

export const isPointInsideTriangle = (v: Array<number>, points: Array<Array<number>>) => {
  const [x, y] = v
  const [p0, p1, p2] = points

  // Calculate barycentric coordinates
  const alpha =
    ((p1[1] - p2[1]) * (x - p2[0]) + (p2[0] - p1[0]) * (y - p2[1])) /
    ((p1[1] - p2[1]) * (p0[0] - p2[0]) + (p2[0] - p1[0]) * (p0[1] - p2[1]))

  const beta =
    ((p2[1] - p0[1]) * (x - p2[0]) + (p0[0] - p2[0]) * (y - p2[1])) /
    ((p1[1] - p2[1]) * (p0[0] - p2[0]) + (p2[0] - p1[0]) * (p0[1] - p2[1]))

  const gamma = 1 - alpha - beta

  // Check if point is inside the triangle
  return alpha > 0 && beta > 0 && gamma > 0
}

export const createTransMatrix = () => {
  const matrix = {
    u_worldViewProjection: twgl.m4.identity(),
    u_world: twgl.m4.identity(),
    u_viewInverse: twgl.m4.identity(),
  }
  // Compute the projection matrix
  const aspect = 1.0
  const fieldOfViewRadians = (53 * Math.PI) / 180
  const projectionMatrix = twgl.m4.perspective(fieldOfViewRadians, aspect, 1, 100)
  // Compute the camera's matrix using look at.
  const cameraPosition = [0, 0, 10]
  const target = [0, 0, 0]
  const up = [0, 1, 0]
  const cameraMatrix = twgl.m4.lookAt(cameraPosition, target, up, matrix.u_viewInverse)

  // Make a view matrix from the camera matrix.
  const viewMatrix = twgl.m4.inverse(cameraMatrix)

  const viewProjectionMatrix = twgl.m4.multiply(projectionMatrix, viewMatrix)
  let worldMatrix = twgl.m4.identity()
  worldMatrix = twgl.m4.rotateZ(worldMatrix, 0)
  worldMatrix = twgl.m4.translate(worldMatrix, twgl.v3.create(0.0, 0.0, 0.0), matrix.u_world)

  // Multiply the matrices.
  twgl.m4.multiply(viewProjectionMatrix, worldMatrix, matrix.u_worldViewProjection)
  return matrix.u_worldViewProjection
}

export const pixelScreenTrans = (v: Array<number>, size: Array<number>) => {
  const [x, y] = v
  return [x, size[1]! - y!]
}
