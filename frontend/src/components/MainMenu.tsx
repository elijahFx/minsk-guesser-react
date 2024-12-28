import React, { useState, useEffect } from "react";
//@ts-ignore
import logoPng from "../assets/minsk-logo-220.png";
import { io, Socket } from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import GameSettings from "./GameSettings";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { setCurrentPlayInfo } from "../slices/coordinatesSlice";

let socket: Socket | null = null;

export default function MainMenu() {
  //@ts-ignore
  const userName = useSelector((state) => state.auth.user.name);
  //@ts-ignore
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  //@ts-ignore
  const { totalRounds, time } = useSelector((state) => state?.coordinates?.currentPlayInfo)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = "Username"; // Replace with dynamic username logic
  const [isConnected, setIsConnected] = useState(false);
  const [isMultiplayerMenuOpen, setIsMultiplayerMenuOpen] = useState(false);
  const [gameName, setGameName] = useState("");
  const [partyId, setPartyId] = useState("");
  const [isCreatingParty, setIsCreatingParty] = useState(false);
  const [isJoiningParty, setIsJoiningParty] = useState(false);
  const [joinPartyId, setJoinPartyId] = useState("");
  const [partyMessage, setPartyMessage] = useState(""); // Message to display

  function handleLogout() {
    if (socket) {
      socket.disconnect(); // Disconnect from the server
      socket = null; // Clear the socket reference
      setIsConnected(false); // Reset the connection state
    }
    dispatch(logoutUser());
    navigate("/login");
  }

  useEffect(() => {
    if (socket) {
      // Listen for party creation
      socket.on("partyCreated", ({ message, party }) => {
        setPartyMessage(message);
        console.log("Party created:", party);
      });

      // Listen for updates when joining a party
      socket.on("updateParty", ({ message, party }) => {
        setPartyMessage(message);
        console.log("Party updated:", party);
      });

      // Handle errors
      socket.on("error", (error) => {
        console.error("Error:", error.message);
        setPartyMessage(error.message);
      });
    }

    // Cleanup socket listeners on component unmount
    return () => {
      if (socket) {
        socket.off("partyCreated");
        socket.off("updateParty");
        socket.off("error");
      }
    };
  }, [socket]);
  
  useEffect(() => {
    if (socket) {
      // Обработка уведомления о готовности партии
      socket.on("partyReady", ({ message }) => {
        console.log(message); // Вывод сообщения в консоль
        navigate("/game"); // Перенаправление на MapComponent
      });
  
      // Очистка обработчика на размонтирование компонента
      return () => {

        //@ts-ignore
        socket.off("partyReady");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      // Получение настроек игры
      socket.on("gameSettings", ({ totalRounds, time }) => {
        console.log("Game settings received:", { totalRounds, time });
        dispatch(setCurrentPlayInfo({ totalRounds, time }));
      });
  
      // Очистка обработчика на размонтирование компонента
      return () => {
        //@ts-ignore
        socket.off("gameSettings");
      };
    }
  }, [socket, dispatch]);

  const connectToServer = () => {
    if (!socket) {
      socket = io("http://localhost:3001");
      socket.emit("joinGame", username);
      setIsConnected(true);
      console.log("Connected to server");
    }
  };

  const handleCreateParty = () => {
    connectToServer();
    setIsCreatingParty(true);
    setIsJoiningParty(false);
    setGameName("");
    setPartyId(nanoid());
    
  };

  const handleConfirmCreateParty = () => {
    if (socket) {
      console.log({ gameName, partyId, username, rounds: totalRounds, time: time });
      
      socket.emit("createParty", { gameName, partyId, username, rounds: totalRounds, time: time });

    }
  };

  const handleJoinParty = () => {
    connectToServer();
    setIsJoiningParty(true);
    setIsCreatingParty(false);
    setJoinPartyId("");
  };

  const handleConfirmJoinParty = () => {
    if (socket && joinPartyId) {
      socket.emit("joinParty", { partyId: joinPartyId, username });
      navigate("/game")
    }
  };

 

  return (
    <div className="main-menu-container">
      <div className="welcome-message">Добро пожаловать, {userName}!</div>

      <img src={logoPng} alt="Logo" className="main-menu-logo" />
      <Link to="/game">
        <button className="main-menu-button">Одиночная игра</button>
      </Link>
      {!isConnected ? (
        <button
          className="main-menu-button"
          onClick={() => setIsMultiplayerMenuOpen(true)}
        >
          Мультиплеер
        </button>
      ) : (
        <button
          className="main-menu-button"
          onClick={() => setIsConnected(false)}
        >
          Выйти
        </button>
      )}
      {isMultiplayerMenuOpen && !isConnected && (
        <div className="multiplayer-options">
          <button className="main-menu-button" onClick={handleCreateParty}>
            Создать партию
          </button>
          <button className="main-menu-button" onClick={handleJoinParty}>
            Подключиться к партии
          </button>
        </div>
      )}
      {isCreatingParty && isConnected && (
        <div className="create-party-form">
          <GameSettings
            gameName={gameName}
            setGameName={setGameName}
            partyId={partyId}
            setPartyId={setPartyId}
          />
          <button
            className="main-menu-button"
            onClick={handleConfirmCreateParty}
          >
            Подтвердить
          </button>
        </div>
      )}
      {isJoiningParty && isConnected && (
        <div className="join-party-form">
          <div>
            <label>
              ID партии:
              <input
                type="text"
                value={joinPartyId}
                onChange={(e) => setJoinPartyId(e.target.value)}
                placeholder="Введите ID партии"
                className="party-input"
              />
            </label>
          </div>
          <button className="main-menu-button" onClick={handleConfirmJoinParty}>
            Подключиться
          </button>
        </div>
      )}
      {partyMessage && <div className="party-message">{partyMessage}</div>}
      {isLoggedIn ? (
        <button className="main-menu-button" onClick={handleLogout}>
          Выйти
        </button>
      ) : (
        ""
      )}
    </div>
  );
}