import React, { useState } from "react";

interface GameSettingsProps {
  gameName: string;
  setGameName: (value: string) => void;
  partyId: string;
  setPartyId: (value: string) => void;
}

export default function GameSettings({
  gameName,
  setGameName,
  partyId,
  setPartyId,
}: GameSettingsProps) {
  const [selectedMap, setSelectedMap] = useState("Минск");
  const [selectedTime, setSelectedTime] = useState(30);
  const [selectedRounds, setSelectedRounds] = useState(5);

  const maps = ["Минск"]; // Добавьте больше карт при необходимости
  const times = [15, 30, 60, 90]; // Варианты времени
  const rounds = [3, 5, 7, 10, 15, 30]

  return (
    <div className="game_settings" style={{ fontFamily: "Arial, sans-serif" }}>
      <h2>Настройки игры</h2>

      {/* Название партии */}
      <div style={{ width: "100%" }}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Название партии:
        </label>
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          placeholder="Введите название партии"
          style={{ padding: "5px", fontSize: "16px", width: "100%" }}
        />
      </div>

      {/* ID партии */}
      <div style={{ width: "100%" }}>
        <label style={{ display: "block" }}>ID партии:</label>
        <input
          type="text"
          value={partyId}
          onChange={(e) => setPartyId(e.target.value)}
          style={{ padding: "5px", fontSize: "16px", width: "100%" }}
        />
      </div>

      {/* Выбор карты */}
      <div style={{ width: "100%" }}>
        <label style={{ display: "block" }}>Выберите карту:</label>
        <select
          value={selectedMap}
          onChange={(e) => setSelectedMap(e.target.value)}
          style={{ padding: "5px", fontSize: "16px", width: "100%" }}
        >
          {maps.map((map, index) => (
            <option key={index} value={map}>
              {map}
            </option>
          ))}
        </select>
      </div>

      {/* Выбор времени */}
      <div style={{ width: "100%" }}>
        <label style={{ display: "block" }}>Выберите время на отгадку:</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(Number(e.target.value))}
          style={{ padding: "5px", fontSize: "16px", width: "100%" }}
        >
          {times.map((time, index) => (
            <option key={index} value={time}>
              {time} секунд
            </option>
          ))}
        </select>
      </div>

      {/* Выбор кол-ва рауднов */}
      <div style={{ width: "100%" }}>
        <label style={{ display: "block" }}>Выберите количество раундов:</label>
        <select
          value={selectedRounds}
          onChange={(e) => setSelectedRounds(Number(e.target.value))}
          style={{ padding: "5px", fontSize: "16px", width: "100%" }}
        >
          {rounds.map((round, index) => (
            <option key={index} value={round}>
              {round} раунд{round === 3 ? "а" : "ов"}
            </option>
          ))}
        </select>
      </div>

      {/* Выбранные настройки */}
      <div>
        <p>
          Выбранная карта: <strong>{selectedMap}</strong>
        </p>
        <p>
          Выбранное время: <strong>{selectedTime} секунд</strong>
        </p>
        <p>
          Выбранное количество раундов: <strong>{selectedRounds} раунд{selectedRounds === 3 ? "а" : "ов"}</strong>
        </p>
      </div>
    </div>
  );
}
