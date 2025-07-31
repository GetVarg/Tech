import { useNavigate } from "react-router";


export default function Footer() {
    const navigate = useNavigate();
    return (
        <div style={styles.footer}>
        <button
          onClick={() => navigate('/Home')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
          }}
          aria-label="Ir para perfil"
        >
          🏠
        </button>
        <span>📋</span>
        <span style={styles.plus}>➕</span>
        <span>💬</span>
        <button
          onClick={() => navigate('/Perfil')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
          }}
          aria-label="Ir para perfil"
        >
          👤
        </button>
      </div>
    );
}

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
    borderTop: '1px solid #ccc',
    marginTop: 'auto',
    fontSize: '24px',
    color: '#6A1B9A',
  },
    plus: {
    fontSize: '32px',
    color: '#F44336',
  },
}