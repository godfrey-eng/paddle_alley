type ClassPart = string | false | null | undefined;

// Joins class names, skipping any that are false / empty.
export function cx(...parts: ClassPart[]): string {
  return parts.filter(Boolean).join(' ');
}
