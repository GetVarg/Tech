import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import handleRegister from '../DB/addRegister';
import './RegisterScreen.css';

export default function Register() {
  const [name, setName] = useState('');
  const [cpfcnpj, setCpfcnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !cpfcnpj || !telefone || !email || !password || !tipoUsuario) {
      setErro('Preencha todos os campos!');
      return;
    }

    const reg = await handleRegister(name.trim(), password, email.trim(), cpfcnpj.trim());
    if (reg) {
      navigate('/');
    } else {
      console.log(reg);
      setErro(reg.error);
    }
  };

  return (
    <div className='container'>
        <img src={require('../assets/ajeita-capybara.png')} alt="Logo" className="logo" />
        <h1 className='title'>Criar conta</h1>

        <div className="toggle-container">
          <button
            type="button"
            className={`toggle-btn ${tipoUsuario === 'cliente' ? 'active' : ''}`}
            onClick={() => setTipoUsuario('cliente')}
          >
            Sou Cliente
          </button>
          <button
            type="button"
            className={`toggle-btn ${tipoUsuario === 'prestador' ? 'active' : ''}`}
            onClick={() => setTipoUsuario('prestador')}
          >
            Sou Prestador
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className='form'>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="coloca o nome"
            className='input'
            required
          />
          <input
            type="text"
            value={cpfcnpj}
            onChange={(e) => setCpfcnpj(e.target.value)}
            placeholder="coloca seu cpf/cnpj ai namoral"
            className='input'
            required
          />
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="coloca seu telefone ai namoral"
            className='input'
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="coloca o email ai bb"
            className='input'
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="coloca a senha ai bb"
            className='input'
            required
          />
          <button type="submit" className='botao' onClick={handleSubmit}>Vai</button>
          {erro && <p className='erro'>{erro}</p>}
        </form>
    </div>
  );
}