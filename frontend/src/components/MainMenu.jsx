import React from 'react';

export default function MainMenu() {
  // Обработчики для пунктов меню
  const handleSinglePlayer = () => {
    console.log('Игра на одного');
    // Здесь можно добавить логику для перехода в режим игры на одного
  };

  const handleMultiplayer = () => {
    console.log('Игра с другом');
    // Здесь можно добавить логику для перехода в режим игры с другом
  };

  const handleExit = () => {
    console.log('Выйти');
    // Здесь можно добавить логику для выхода из игры
  };

  return (
    <div style={styles.menuContainer}>
      <h1 style={styles.title}>Меню</h1>
      <button style={styles.button} onClick={handleSinglePlayer}>
        Игра на одного
      </button>
      <button style={styles.button} onClick={handleMultiplayer}>
        Игра с другом
      </button>
      <button style={styles.button} onClick={handleExit}>
        Выйти
      </button>
    </div>
  );
}

// Стили для компонентов
const styles = {
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#282c34',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
  },
  button: {
    fontSize: '1.2rem',
    padding: '0.8rem 1.5rem',
    margin: '0.5rem',
    backgroundColor: '#61dafb',
    color: '#282c34',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#21a1f1',
  },
};
