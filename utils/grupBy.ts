export function groupById<T>(data: T[], cb: (item: T) => any): Map<any, T[]> {
  const map = new Map();

  data.forEach((item) => {
    const key = cb(item);
    const collection = map.get(key);

    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });

  return map;
}
