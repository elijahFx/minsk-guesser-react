import React, { useEffect } from "react";

export function Notification({ distance, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      <span
        className="material-symbols-outlined"
        onClick={onClose}
        style={{ cursor: "pointer" }}
      >
        check
      </span>
      <h5 className="textContent">
        Вы оказались в <span className="outlineText">{distance} м.</span> от
        заданной точки
      </h5>
    </div>
  );
}
