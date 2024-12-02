export function evaluate(grades: number[]): string {
  const sum = grades.reduce((acc, curr) => acc + curr, 0);
  const average = Math.floor((sum / grades.length) * 100) / 100;

  if (average === 1) {
    return `${average} балл`;
  } else if (average >= 2 && average <= 4) {
    return `${average} балла`;
  } else {
    return `${average} баллов`;
  }
}