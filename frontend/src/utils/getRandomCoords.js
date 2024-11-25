export function getRandomCoords() {
  let randomCoordX =
    53.849329 + Math.random() * (53.945763 + 0.00001 - 53.849329);
  let randomCoordY =
    27.460391 + Math.random() * (27.654925 + 0.00001 - 27.460391);

  return [randomCoordX, randomCoordY];
}
