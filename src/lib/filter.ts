/** A value usable in an id and a space-separated data attribute: "Robot arm" -> "robot-arm" */
export function filterKey(value: string): string {
  return value.trim().toLowerCase().replace(/[\s"'#.:\\/[\]()]+/g, '-');
}

export function filterId(name: string, value: string): string {
  return `f-${name}-${filterKey(value)}`;
}
