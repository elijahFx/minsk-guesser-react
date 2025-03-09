import React from "react";
import { useSelector } from "react-redux";


const RoundResults = () => {
  const roundResults = useSelector(
    //@ts-ignore
    (state) => state.coordinates.roundResults
  );

  return (
    <div>
      <h2>Результаты раундов</h2>
      <ul>
        {roundResults?.map((result, index) => (
          <li key={index}>
            <p>Игрок: {result.playerName}</p>
            <p>Дистанция: {result.length} м</p>
            <p>Очки: {result.score}</p>
            <p>
              Статистика: Победы: {result.stats.wins}, 
              Поражения: {result.stats.losses}, 
              Всего очков: {result.stats.totalScore}, 
              Раунды: {result.stats.rounds}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoundResults;
