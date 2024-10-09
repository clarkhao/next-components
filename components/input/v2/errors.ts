import { z } from "zod"

export const getErrMsg = (state: ValidityState, config: string) => {
  if (state.badInput) {
    return "invalid input format"
  } else if (state.patternMismatch) {
    switch (config) {
      case "name":
        return "only contain letter, number, underscore and hyphen"
      case "password":
        return "Your password needs to be more secure"
      default:
        return `invalid ${config}`
    }
  } else if (state.tooLong) {
    return "value exceeds maximum length"
  } else if (state.tooShort) {
    return "value is below minimum length"
  } else if (state.typeMismatch) {
    return `invalid ${config}`
  } else if (state.valueMissing) {
    return "This field is required"
  } else if (state.valid) {
    return undefined
  } else {
    return "invalid input format"
  }
}

export type TPwdMessage = {
  pass: boolean
  msg: string
}

export const validatePassword = (value: string) => {
  const messages: Array<TPwdMessage> = [
    { pass: true, msg: "at least 8 characters long" },
    { pass: true, msg: "contains at least one lowercase English character" },
    { pass: true, msg: "contains at least one uppercase English character" },
    { pass: true, msg: "contains at least one number" },
    { pass: true, msg: "contains at least one of !@#$%^&*" },
  ]
  const schema = z
    .string()
    .min(8, { message: "at least 8 characters long" })
    .regex(new RegExp("[a-z]"), { message: "contains at least one lowercase English character" })
    .regex(new RegExp("[A-Z]"), { message: "contains at least one uppercase English character" })
    .regex(new RegExp("[0-9]"), { message: "contains at least one number" })
    .regex(new RegExp("[!@#$%^&*]"), { message: "contains at least one of !@#$%^&*" })

  const validated = schema.safeParse(value)
  if (!validated.success) {
    return messages.map((el) => {
      return { ...el, pass: !validated.error.issues.some((issue) => issue.message === el.msg) }
    })
  } else {
    return messages
  }
}
