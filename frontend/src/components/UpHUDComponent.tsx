import React, { useEffect, useState } from "react";
import { setCurrentPlayInfo } from "../slices/coordinatesSlice";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

let socket = io("http://localhost:3001");

interface UpHUDProps {
  map: string;
  round: number;
  time: string;
  grade: number;
  user1: "yes" | "no";
  user2: "yes" | "no";
  MAX_ROUNDS: number;
}

const UpHUD: React.FC<UpHUDProps> = ({
  map,
  round,
  time,
  grade,
  user1,
  user2,
  MAX_ROUNDS,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();

  return (
    <div
      className={`uphud-container ${isHovered ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="uphud-content">
        {isHovered && (
          <>
            {" "}
            <div className="uphud-row">
              <h4>Карта:</h4>
              <h3>{map}</h3>
            </div>
            <div className="uphud-row">
              <h4>Раунд:</h4>
              <h3>
                {round} / {MAX_ROUNDS}
              </h3>
            </div>
            <div className="uphud-row">
              <h4>Время:</h4>
              <h3>{time} сек.</h3>
            </div>
            <div className="uphud-row">
              <h4>Балл:</h4>
              <h3>{grade}</h3>
            </div>
            <div className="uphud-row">
              <h4>Вы:</h4>
              <h3>{user1}</h3>
            </div>
            <div className="uphud-row">
              <h4>Соперник:</h4>
              <h3>{user2}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpHUD;
