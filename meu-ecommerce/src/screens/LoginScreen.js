import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './LoginScreen.css';

import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const login = await signInWithEmailAndPassword(auth, email, senha);
      navigate('/home');
    } catch (err) {
        setErro(err.message);
        return;
    } finally {
      setLoading(false);
    }
  };

  const handleCriarConta = () => {
    navigate('/Register');
  }

  return (
    <div className="container">
      <img src={require('../assets/ajeita-capybara.png')} alt="Logo" className="logo" />

      <p className="subtitle">Sua solução para serviços domésticos.</p>

      <form onSubmit={handleLogin} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="input"
        />

        {erro && <p className="errorText">{erro}</p>}

        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>

        <div className="linkWrapper">
          <button type="button" onClick={() => navigate('/register')} className="linkButton">
            Não tem uma conta? <span className="linkTextBold">Cadastre-se</span>
          </button>
        </div>
      </form>
    </div>
  );
}