import { validatePassword } from "./errors"
import { z } from "zod"

describe("validatePassword", () => {
  const messages = [
    { pass: true, msg: "at least 8 characters long" },
    { pass: true, msg: "contains at least one lowercase English character" },
    { pass: true, msg: "contains at least one uppercase English character" },
    { pass: true, msg: "contains at least one number" },
    { pass: true, msg: "contains at least one of !@#$%^&*" },
  ]

  test("returns all pass as true for a valid password", () => {
    const result = validatePassword("Valid1Password!")
    expect(result).toEqual(messages)
  })

  test("fails if password is less than 8 characters", () => {
    const expected = messages.map((el) => (el.msg === "at least 8 characters long" ? { ...el, pass: false } : el))
    const result = validatePassword("Short1!")
    expect(result).toEqual(expected)
  })

  test("fails if password does not contain a lowercase character", () => {
    const expected = messages.map((el) =>
      el.msg === "contains at least one lowercase English character" ? { ...el, pass: false } : el
    )
    const result = validatePassword("NOLOWERCASE1!")
    expect(result).toEqual(expected)
  })

  test("fails if password does not contain an uppercase character", () => {
    const expected = messages.map((el) =>
      el.msg === "contains at least one uppercase English character" ? { ...el, pass: false } : el
    )
    const result = validatePassword("nouppercase1!")
    expect(result).toEqual(expected)
  })

  test("fails if password does not contain a number", () => {
    const expected = messages.map((el) => (el.msg === "contains at least one number" ? { ...el, pass: false } : el))
    const result = validatePassword("NoNumber!")
    expect(result).toEqual(expected)
  })

  test("fails if password does not contain a special character", () => {
    const expected = messages.map((el) =>
      el.msg === "contains at least one of !@#$%^&*" ? { ...el, pass: false } : el
    )
    const result = validatePassword("NoSpecial1")
    expect(result).toEqual(expected)
  })
})
