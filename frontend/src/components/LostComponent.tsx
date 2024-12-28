import React from 'react';

const LostComponent: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.text}>Вы проиграли!</h1>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8d7da',
    },
    text: {
        color: '#721c24',
        fontSize: '2rem',
        fontWeight: 'bold',
    },
};

export default LostComponent;
