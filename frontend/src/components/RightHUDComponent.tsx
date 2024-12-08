import React from "react";

interface RightHUDComponentProps {
  count: number; // Current round number
  totalRounds: number; // Total number of rounds
  grade: number; // Current score
}

const RightHUDComponent: React.FC<RightHUDComponentProps> = ({
  count,
  totalRounds,
  grade,
}) => {

  return (
    <div className="infoBox">
      <div className="topRow">
        <h4>Карта:</h4>
        <h4>Раунд:</h4>
        <h4>Баллы:</h4>
      </div>
      <div className="bottomRow">
        <h3 id="city">Минск</h3>
        <h3 id="roundElement">{count} / {totalRounds}</h3>
        <h3 id="pointsElement">{grade}</h3>
      </div>
    </div>
  );
};

export default RightHUDComponent;
