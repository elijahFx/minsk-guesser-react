import React from "react";

export default function UsualButton({
  currentCoords,
  onSubmitGuess,
  isPinPlaced,
}) {
  return (
    <button
      style={isPinPlaced ? { backgroundColor: "rgb(126, 182, 68)" } : {}}
      className="submitBtn"
      onClick={() => {
        if (currentCoords) {
          onSubmitGuess(currentCoords);
        } else {
          alert("Please place a pin before submitting!");
        }
      }}
      disabled={!isPinPlaced}
    >
      {isPinPlaced ? "УГАДАТЬ" : "ПОМЕСТИТЕ БУЛАВКУ"}
    </button>
  );
}
