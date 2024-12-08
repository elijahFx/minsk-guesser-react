export function evaluateDistance(distance: number): number {
  if (distance > 0 && distance < 100) {
    // Fix here: AND instead of OR
    return 10;
  } else if (distance >= 100 && distance < 250) {
    return 9;
  } else if (distance >= 250 && distance < 300) {
    return 8;
  } else if (distance >= 300 && distance < 500) {
    return 7;
  } else if (distance >= 500 && distance < 800) {
    return 6;
  } else if (distance >= 800 && distance < 1000) {
    return 5;
  } else if (distance >= 1000 && distance < 1500) {
    return 4;
  } else if (distance >= 1500 && distance < 2000) {
    return 3;
  } else if (distance >= 2000 && distance < 3000) {
    return 2;
  } else if (distance >= 3000 && distance < 4000) {
    return 1;
  } else {
    return 0;
  }
}
