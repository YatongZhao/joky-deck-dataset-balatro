export function randomByWeight<T>(items: { item: T, weight: number }[]) {
  const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);
  const random = Math.random() * totalWeight;
  let sum = 0;
  for (const item of items) {
    sum += item.weight;
    if (random <= sum) {
      return item.item;
    }
  }
  return items[items.length - 1].item;
}

export function randomInList<T>(list: T[]) {
  if (list.length === 0) {
    throw new Error('List is empty');
  }
  return list[Math.floor(Math.random() * list.length)];
}

export function randomByChance(chance: number) {
  return Math.random() < chance;
}

export function randomIntInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
