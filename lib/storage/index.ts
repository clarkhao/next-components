"use client"
// custom functions
export function getInitStorage<T extends Record<string, unknown>, S extends keyof T>(
  key: string,
  slice: Array<S>
): Pick<T, S> | Error {
  const result: Record<string, unknown> = {}
  if (typeof window === "undefined") return new Error("storage null")
  const values = window.sessionStorage.getItem(key)
  if (values === null) return new Error("storage null")
  else {
    const raw = JSON.parse(values as string)
    for (const s of slice) {
      result[s.toString()] = raw[s]
    }
    return result as Pick<T, S>
  }
}

export function mergeStorage<T extends Record<string, unknown>, S extends keyof T>(
  key: string,
  slice: Array<S>,
  init: T
): T {
  const storage = getInitStorage<T, S>(key, slice)
  if (storage instanceof Error) {
    return init
  }
  return { ...init, ...storage }
}

export class LocalStorageAPI<T> {
  private storageKey: string

  constructor(key: string) {
    this.storageKey = key
  }

  // Save data to localStorage
  save(data: T): void {
    try {
      const jsonData = JSON.stringify(data) // Serialize data to JSON string
      localStorage.setItem(this.storageKey, jsonData)
    } catch (error) {
      console.error(`Error saving data to localStorage: ${error}`)
    }
  }

  // Load data from localStorage
  load(): T | null {
    try {
      const jsonData = localStorage.getItem(this.storageKey)
      if (jsonData) {
        return JSON.parse(jsonData) as T // Deserialize JSON string to object
      }
      return null
    } catch (error) {
      console.error(`Error loading data from localStorage: ${error}`)
      return null
    }
  }

  // Remove data from localStorage
  remove(): void {
    localStorage.removeItem(this.storageKey)
  }

  // Check if data exists in localStorage
  exists(): boolean {
    return localStorage.getItem(this.storageKey) !== null
  }
}
