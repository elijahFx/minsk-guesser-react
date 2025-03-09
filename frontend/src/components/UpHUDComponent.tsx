import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { logoutUser } from "../slices/authSlice";
import { useNavigate } from "react-router";

let socket = io("http://localhost:3001");

interface UpHUDProps {
  map: string;
  round: number;
  time: string;
  grade: number;
  MAX_ROUNDS: number;
}

const UpHUD: React.FC<UpHUDProps> = ({
  map,
  round,
  time,
  grade,
  MAX_ROUNDS,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [countdown, setCountdown] = useState(10); // Начальное значение таймера
  const dispatch = useDispatch();
  const navigate = useNavigate()

  function handleL() {
    console.log("ты проебал");
    dispatch(logoutUser())
    navigate("/login")
  }

  function handleSkipRound() {
    console.log("ты скипнул раунд");
    
  }

  const opponentsName = useSelector(
    //@ts-ignore
    (state) => state?.coordinates?.currentPlayInfo?.opponentsName
  );
  //@ts-ignore
  const userName = useSelector((state) => state?.auth?.user?.name);

  useEffect(() => {
    // Сбрасываем таймер, когда начинается новый раунд
    setCountdown(+time);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Вы не сделали ход за этот раунд. Ваш балл за этот раунд - 0");
          return 0; // Завершаем таймер
        }
        return prev - 1; // Уменьшаем на 1 каждую секунду
      });
    }, 1000);

    // Очистка таймера при размонтировании или обновлении
    return () => clearInterval(timer);
  }, [round]);

  return (
    <div
      className={`uphud-container ${isHovered ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <button onClick={handleSkipRound} className="skip-button right">Пропустить раунд</button>
      )}
      {isHovered && <button onClick={handleL} className="surrender-button right">Сдаться</button>}

      <div className="uphud-content">
        {isHovered && (
          <>
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
              <h3>{countdown} сек.</h3>
            </div>
            <div className="line-between"></div>
            <div className="uphud-row point">
              <h4>Балл:</h4>
              <h3>
                <span className="yellow-glow">{grade}</span>
              </h3>
            </div>
            <div className="uphud-row">
              <h4>Вы:</h4>
              <h3>
                <span className="blue-glow">{userName}</span>
              </h3>
            </div>
            <div className="uphud-row">
              <h4>Соперник:</h4>
              <h3>
                <span className="red-glow">{opponentsName}</span>
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpHUD;
