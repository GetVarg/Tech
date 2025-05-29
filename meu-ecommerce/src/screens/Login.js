import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const login = await signInWithEmailAndPassword(auth, email, senha);
      navigate('/home');
    } catch (err) {
        setErro(err.message);
        return;
    }
  };

  const handleCriarConta = () => {
    navigate('/Register');
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Entrar</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.botao}>Entrar</button>
          {erro && <p style={styles.erro}>{erro}</p>}

          <button 
            type="button" 
            style={styles.criarConta}
            onClick={handleCriarConta} 
          >
            Criar conta
          </button>

          {erro && <p style={styles.erro}>{erro}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f9a825',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 10px #00000033',
    width: '300px',
    textAlign: 'center',
  },
  titulo: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    border: '1px solid #aaa',
    borderRadius: '5px',
    fontSize: '16px',
  },
  botao: {
    padding: '10px',
    backgroundColor: '#f57f17',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  erro: {
    marginTop: '10px',
    color: 'red',
    fontSize: '14px',
  },
  criarConta: {
  fontSize: '0.9rem',
  color: '#E6A740',
  backgroundColor: 'transparent',
  border: 'none',
  marginTop: '10px',
  cursor: 'pointer',
  textDecoration: 'underline',
  alignSelf: 'center',
  },
};
