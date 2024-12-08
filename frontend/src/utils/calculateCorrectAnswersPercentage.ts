/**
 * Calculate the percentage of correct answers based on the provided polyline lengths.
 * 
 * @param polylineLengths - Array of objects containing `round` and `length`.
 * @returns The percentage of correct answers (rounded to the nearest integer).
 */
export const calculateCorrectAnswersPercentage = (polylineLengths: { round: number; length: number }[]): string | number => {
    if (!polylineLengths || polylineLengths.length === 0) {
      return 0;
    }
  
    const totalLength = polylineLengths.reduce((sum, polyline) => sum + polyline.length, 0);
    const averageLength = totalLength / polylineLengths.length;
  
    const correctAnswers = polylineLengths.filter(polyline => polyline.length <= averageLength);
  
    const percentage = (correctAnswers.length / polylineLengths.length) * 100;
    console.log(`процент - ${percentage}`);
    
    return percentage.toFixed(2); // Round to the nearest integer
  };
  

  