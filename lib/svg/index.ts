export interface Transform {
  translateX: number
  translateY: number
  scale?: number
}

export interface PathData {
  d: string
  transform: Transform
}

export interface CoordData {
  cmd: string | undefined
  coords: Array<number>
}

export function applyTransform(data: Array<CoordData>, transform: Transform) {
  return data.map((el) => {
    const coords = el.coords
    // Apply the translation and scaling to x, y coordinates
    if (coords.length > 0) {
      for (let i = 0; i < coords.length; i += 2) {
        // Apply translate and scale for x and y coordinates
        if (!isNaN(coords[i]!)) {
          coords[i] = coords[i]! * (transform.scale ?? 1) + transform.translateX // x coordinate
        }
        if (!isNaN(coords[i + 1]!)) {
          coords[i + 1] = coords[i + 1]! * (transform.scale ?? 1) + transform.translateY // y coordinate
        }
      }
    }
    return { ...el, coords }
  })
}

export function combinePaths(gTransform: Transform, paths: PathData[]) {}

export function extractCoordFromD(data: PathData): Array<CoordData> {
  // Split the path data by spaces
  const commands = data.d.split(/(?=[mlchvqtsa])/i)
  const newCommands = commands.map((command) => {
    // split by , or any whitespace(space, tab, newline, etc)
    const parts = command.trim().split(/[\s,]+/)
    const cmd = parts[0]?.toLowerCase()
    const coords = parts.slice(1).map(parseFloat)

    // Apply the translation and scaling to x, y coordinates
    if (coords.length > 0) {
      for (let i = 0; i < coords.length; i += 2) {
        // Apply translate and scale for x and y coordinates
        if (!isNaN(coords[i]!)) {
          coords[i] = coords[i]! * (data.transform.scale ?? 1) + data.transform.translateX // x coordinate
        }
        if (!isNaN(coords[i + 1]!)) {
          coords[i + 1] = coords[i + 1]! * (data.transform.scale ?? 1) + data.transform.translateY // y coordinate
        }
      }
    }
    return { cmd, coords }
  })

  return newCommands
}
