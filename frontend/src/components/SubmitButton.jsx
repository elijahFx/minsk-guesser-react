import React from "react";

export default function SubmitButton({ currentCoords, isPinPlaced }) {

  return (
    <button
      style={isPinPlaced ? { backgroundColor: "rgb(126, 182, 68)" } : {}}
      className="submitBtn"
      disabled={!isPinPlaced}
    >
      {isPinPlaced ? "УГАДАТЬ" : "ПОМЕСТИТЕ БУЛАВКУ"}
    </button>
  );
}
