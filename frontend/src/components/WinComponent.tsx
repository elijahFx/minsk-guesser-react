import React from 'react';

const WinComponent: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.text}>Вы выиграли!</h1>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#d4edda',
    },
    text: {
        color: '#155724',
        fontSize: '2rem',
        fontWeight: 'bold',
    },
};

export default WinComponent;
