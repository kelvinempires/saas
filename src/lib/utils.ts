import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeTrailingSlash(path: string) {
  return path.replace(/\/$/, "");
}

export function createURL(
  href: string,
  oldParams: Record<string, string>,
  newParams: Record<string, string | undefined>
) {
  // Filter out undefined values from oldParams before creating URLSearchParams
  const filteredOldParams = Object.entries(oldParams).filter(
    ([, value]) => value !== undefined
  );
  const params = new URLSearchParams(filteredOldParams as [string, string][]);

  Object.entries(newParams).forEach(([key, value]) => {
    if (value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });

  return `${href}?${params.toString()}`;
}
