export function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
