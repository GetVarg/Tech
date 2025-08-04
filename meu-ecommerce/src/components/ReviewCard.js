import React from 'react';

const ReviewCard = ({ nota, comentario, imagens }) => {
  return (
    <div style={styles.card}>
      <p><strong>Nota:</strong> {nota}</p>
      <p><strong>Comentário:</strong> {comentario || 'Sem comentário'}</p>

      {imagens?.length > 0 && (
        <div style={styles.imagemContainer}>
          {imagens.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Imagem ${index + 1}`}
              style={styles.imagem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    color: '#333',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
    fontSize: '14px',
    fontFamily: 'Segoe UI, sans-serif',
    marginBottom: '16px',
  },
  imagemContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '8px',
  },
  imagem: {
    width: '72px',
    height: '72px',
    objectFit: 'cover',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
};

export default ReviewCard;
