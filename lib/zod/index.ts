import { z } from "zod";

export type TValidation = {
  value: number | string;
  message: string;
};
type TCheck = {
  kind: string;
  value: unknown;
  message: string;
};
export type TCompare = {
  kind: string;
  value: boolean | undefined;
  message: string;
};

export class Validate {
  validation: z.ZodTypeAny;
  key: string;
  constructor(
    raw: {
      [key: string]: string | TValidation | Array<TValidation>;
    },
    key: string,
  ) {
    this.key = key;
    switch (raw.type) {
      case "string":
        this.validation = z.string();
        break;
      default:
        this.validation = z.unknown();
        break;
    }
    for (const key in raw) {
      switch (key) {
        case "min":
          switch (this.validation._def.typeName) {
            case "ZodString":
              this.validation = (this.validation as z.ZodString).min(
                (raw[key] as TValidation).value as number,
                { message: (raw[key] as TValidation).message },
              );
          }
          break;
        case "max":
          switch (this.validation._def.typeName) {
            case "ZodString":
              this.validation = (this.validation as z.ZodString).max(
                (raw[key] as TValidation).value as number,
                { message: (raw[key] as TValidation).message },
              );
          }
          break;
        case "regex":
          switch (this.validation._def.typeName) {
            case "ZodString":
              for (const r of raw[key] as TValidation[]) {
                this.validation = (this.validation as z.ZodString).regex(
                  new RegExp(r.value as string),
                  { message: r.message },
                );
              }
          }
          break;
        case "email":
          switch (this.validation._def.typeName) {
            case "ZodString":
              this.validation = (this.validation as z.ZodString).email({
                message: (raw[key] as TValidation).message,
              });
          }
          break;
        default:
          break;
      }
    }
  }
  public verify(value: unknown) {
    const checks = this.validation.safeParse(value);
    return checks.success ? null : checks.error.issues;
  }
  // compare the json and check result
  public compare(issues: z.ZodIssue[] | null) {
    const result: Array<TCompare> = [];
    if (issues !== null) {
      const messages = issues.map((is) => is.message);
      const checks = this.validation._def.checks;
      console.log(this.validation._def);
      for (const c of checks as Array<TCheck>) {
        result.push({
          kind: c.kind,
          value: messages.some((msg) => msg.includes(c.message)),
          message: c.message,
        });
      }
      return { result, pass: false };
    } else {
      result.push(
        ...this.validation._def.checks.map((el: any) => {
          return {
            kind: el.kind,
            value: false,
            message: el.message,
          };
        }),
      );
      return { result, pass: true };
    }
  }
}

export class PswValidate extends Validate {
  length: number;
  constructor(
    raw: {
      [key: string]: string | TValidation | Array<TValidation>;
    },
    key: string,
    length: number,
  ) {
    super(raw, key);
    this.length = length;
  }
  public compare(issues: z.ZodIssue[] | null) {
    const result: Array<TCompare> = [];
    let counter = 0;
    if (issues !== null) {
      const messages = issues.map((is) => {
        if (is.message.startsWith("contains")) {
          counter++;
        }
        return is.message;
      });
      const checks = this.validation._def.checks;
      for (const c of checks as Array<TCheck>) {
        result.push({
          kind: c.kind,
          value:
            c.message.startsWith("contains") && messages.includes(c.message) && counter === 1
              ? undefined
              : messages.includes(c.message),
          message: c.message,
        });
      }
    } else {
      result.push(
        ...this.validation._def.checks.map((el: any) => {
          return {
            kind: el.kind,
            value: false,
            message: el.message,
          };
        }),
      );
    }

    result.push({
      kind: "better",
      value: this.length > 10 ? false : undefined,
      message: "better to be more than 10 chars long",
    });
    return {
      result,
      pass: counter < 2 && result.filter((r) => r.value === true).length === 0,
    };
  }
}
