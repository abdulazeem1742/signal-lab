type ClassDictionary = Record<string, boolean | null | undefined>;
type ClassValue = string | false | null | undefined | ClassDictionary | ClassValue[];

/**
 * Lightweight className merger without an extra dependency.
 * Filters falsy values and joins the rest.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flatMap((input) => {
      if (!input) return [];
      if (typeof input === "string") return [input];
      if (Array.isArray(input)) return input;
      if (typeof input === "object") {
        return Object.entries(input)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .join(" ");
}
