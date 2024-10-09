"use client";
/**
 * 
 * @param key storage key
 * @param slice child keys of the value of the storage 
 * @returns 
 */
export function getInitStorage<T extends Record<string, unknown>, S extends keyof T>(
  key: string,
  slice: Array<S>,
): Pick<T, S> | Error {
  const result: Record<string, unknown> = {};
  if (typeof window === "undefined") return new Error("storage null");
  const values = window.sessionStorage.getItem(key);
  if (values === null) return new Error("storage null");
  else {
    const raw = JSON.parse(values as string);
    for (const s of slice) {
      result[s.toString()] = raw[s];
    }
    return result as Pick<T, S>;
  }
}

export function mergeStorage<T extends Record<string, unknown>, S extends keyof T>(
  key: string,
  slice: Array<S>,
  init: T,
): T {
  const storage = getInitStorage<T, S>(key, slice);
  if (storage instanceof Error) {
    return init;
  }
  return { ...init, ...storage };
}