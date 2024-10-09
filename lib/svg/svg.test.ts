import { applyTransform, combinePaths, Transform, PathData } from "./index"

describe("applyTransform", () => {
  it("should apply translation to a simple path", () => {
    const pathD = "m 0,0 l 10,10"
    const transform: Transform = { translateX: 10, translateY: 20 }

    const result = applyTransform(pathD, transform)
    expect(result).toBe("m 10,20 l 20,30")
  })

  it("should apply scaling and translation to a simple path", () => {
    const pathD = "m 0,0 l 10,10"
    const transform: Transform = { translateX: 10, translateY: 20, scaleX: 2, scaleY: 2 }

    const result = applyTransform(pathD, transform)
    expect(result).toBe("m 10,20 l 30,40")
  })

  it("should handle path with multiple commands and apply transform", () => {
    const pathD = "m 0,0 l 10,10 c 10,10,20,20,30,30"
    const transform: Transform = { translateX: 10, translateY: 20, scaleX: 1.5, scaleY: 2 }

    const result = applyTransform(pathD, transform)
    expect(result).toBe("m 10,20 l 25,40 c 25,40,40,60,55,80")
  })
})
describe("combinePaths", () => {
  it("should combine paths with their transforms and a group transform", () => {
    const gTransform: Transform = { translateX: 10, translateY: 10, scaleX: 1, scaleY: 1 }
    const paths: PathData[] = [
      {
        d: "m 0,0 l 10,10",
        transform: { translateX: 5, translateY: 5 },
      },
      {
        d: "m 10,10 l 20,20",
        transform: { translateX: -5, translateY: -5 },
      },
    ]

    const result = combinePaths(gTransform, paths)
    expect(result).toBe("m 15,15 l 25,25 m 15,15 l 25,25")
  })
})
