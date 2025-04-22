function getRandomElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber() {
  return Math.floor(Math.random() * 1001);
}

export { getRandomElement, getRandomNumber };
