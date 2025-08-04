import { useNavigate } from "react-router";
import { useUser } from "../UserContext";
import getReviews from "../DB/getReviews";
import { doc } from "firebase/firestore";

export default function Footer() {
  const navigate = useNavigate();
  const { user, updateUserField } = useUser();
  
  const handlePerfilClick = () => {
    (async () => {
      const snapshot = await getReviews(user.uid);

      console.log("Tem algo: ", snapshot.docs.map(doc => doc.data()));

      updateUserField("reviews", snapshot.docs.map(doc => doc.data()));
      console.log("Avaliações do usuário:", user?.reviews);

      navigate('/Perfil');
    })();
  };

  
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
        onClick={handlePerfilClick}
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