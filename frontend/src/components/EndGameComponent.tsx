import React, { useEffect } from "react";
//@ts-ignore
import logoPng from "../assets/minsk-logo-220.png";

interface EndGameComponentProps {
  average: number; // Percentage of correct answers.
}

const EndGameComponent: React.FC<EndGameComponentProps> = ({ average }) => {
  console.log(average);

  // Simulate progress bar movement.
  const moveProgressBar = (
    progressRef: React.RefObject<HTMLDivElement>,
    percentage: number
  ) => {
    if (progressRef.current) {
      // Check if progressRef.current is not null
      let currentProgress = 0;
      const interval = setInterval(() => {
        if (currentProgress >= percentage) {
          //@ts-ignore
          clearInterval(interval);
        } else {
          currentProgress++;
          if (progressRef.current) {
            // Additional check inside the interval
            progressRef.current.style.width = `${currentProgress}%`;
            progressRef.current.innerHTML = `${currentProgress}%`;
          }
        }
      }, 10);
    }
  };

  const progressRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      moveProgressBar(progressRef, average * 10); // Multiply by 100 to convert average to percentage
    }
  }, [average]);

  return (
    <div className="endgame-container">
      {/* Map Panorama Section */}
      <div className="blackScreen1">
        <div className="logo">
          <img className="logo" src={logoPng} alt="Game Logo" />
        </div>
        <span
          className="material-symbols-outlined restart-button"
          onClick={() => {
            window.location.reload();
          }}
        >
          restart_alt
        </span>
      </div>

      {/* Progress Section */}
      <div className="blackScreen2">
        <div className="myProgress">
          <div className="myBar" ref={progressRef}>
            0%
          </div>
        </div>
        <h6 className="beautyFont">
          Процент правильности ваших ответов составляет...
        </h6>
      </div>
    </div>
  );
};

export default EndGameComponent;
