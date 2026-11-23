/** Index an array whose length is an invariant of the caller; a miss is a bug, not a value. */
export function at<T>(items: readonly T[], index: number): T {
  const item = items[index];
  if (item === undefined) {
    throw new RangeError(`index ${index} is outside an array of length ${items.length}`);
  }
  return item;
}
