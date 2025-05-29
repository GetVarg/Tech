import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleRegister from '../DB/addRegister'; // ajuste o caminho conforme sua pasta

export default function Register() {
  const [name, setName] = useState('');
  const [cpfcnpj, setCpfcnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const reg = await handleRegister(name.trim(), password, email.trim(), cpfcnpj.trim());
    if (reg) {
      navigate('/');
    } else {
      console.log(reg);
      setErro(reg.error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Criar conta</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="coloca o nome"
            style={styles.input}
            required
          />
          <input
            type="text"
            value={cpfcnpj}
            onChange={(e) => setCpfcnpj(e.target.value)}
            placeholder="coloca seu cpf/cnpj ai namoral"
            style={styles.input}
            required
          />
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="coloca seu telefone ai namoral"
            style={styles.input}
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="coloca o email ai bb"
            style={styles.input}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="coloca a senha ai bb"
            style={styles.input}
            required
          />
          <button type="submit" style={styles.botao} onClick={handleSubmit}>Vai</button>
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
    width: '340px',
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
    padding: '12px',
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
};
