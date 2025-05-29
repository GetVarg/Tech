import React from 'react';

export default function ServicesCard({ titulo, horario, data, profissional, imagem }) {
  return (
    <div style={styles.card}>
      <img src={imagem} alt="Serviço" style={styles.image} />
      <div style={styles.info}>
        <strong>{titulo}</strong>
        <p>⏰ {horario} | 📅 {data}</p>
        <p>📍 Profissional: {profissional}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'black',
    display: 'flex',
    gap: '10px',
    border: '2px solid #1976D2',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#fefefe',
    alignItems: 'center',
    maxWidth: '400px',
    height: '100%',
  },
  image: {
    width: '80px',
    height: '60px',
    borderRadius: '6px',
    objectFit: 'cover',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
  },
};