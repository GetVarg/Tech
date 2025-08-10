import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './Perfil.css';
import logo from '../assets/ajeita-capybara.png';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';
import { useUser } from "../UserContext.js";

import Footer from '../components/Footer.js';

const Perfil = () => {
  const { user, setUser, loading } = useUser();

  const [foto, setFoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fotoURL, setFotoURL] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect (() => {
    const getFoto = async () => {
        if (!user){
            navigate('/');
            return;
        }
        try {
            const userRef = doc(db, 'Clients', user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()){
                const dados = userSnap.data();
                if (dados.fotoURL){
                    console.log(dados.fotoURL)
                    setFotoURL(dados.fotoURL);
                } else {
                    setFotoURL('../assets/avatar_padrão.png');
                }
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Erro ao buscar foto de perfil: ", error);
            setFotoURL('../assets/avatar_padrão.png');
        }
    };
    getFoto();
  }, [user?.uid]);

  const handleReviews = () => {
    navigate('/reviews');
  };

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        const localUrl = URL.createObjectURL(file);
        setPreviewUrl(localUrl);

        const formData = new FormData();
        formData.append('foto', file);
        formData.append('uid', user.uid);

        try {
            const res = await axios.post('http://localhost:5000/api/upload-foto', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            await updateDoc(doc(db, 'Clients', user.uid), {
                fotoURL: res.data.url
            });

            const docRef = doc(db, 'usuarios', user.uid);
            const updatedSnap = await getDoc(docRef);
            const updatedData = updatedSnap.data();

            setUser(prev => ({
            ...prev,
            ...updatedData
            }));

        } catch (err) {
        console.error("Erro ao enviar imagem:", err);
        }
    }
  };

  const handleClick = () => {
    inputRef.current.value = null;
    inputRef.current.click();
  }

  return (
    <div className="perfil-container">
      <div className="perfil-topo">
        <img src={logo} alt="Logo Ajeita" className="perfil-logo" />
        <p className="perfil-lema">Sua solução para serviços domésticos.</p>
      </div>

      <div className="perfil-usuario">
        <div className="perfil-foto-container">
            
            {fotoURL && fotoURL !== '/avatar-padrao.png' ? (
                <img
                    src={fotoURL}
                    alt="Foto de perfil"
                    className="perfil-foto"
                    onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/avatar-padrao.png';
                    }}
                />
                ) : (
                <div className="upload-container">
                    <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleFotoChange}
                    style={{ display: 'none' }}
                    />
                    <button
                    type="button"
                    className="upload-button"
                    onClick={handleClick}
                    >
                    📸 Escolher Foto
                    </button>
                </div>
            )}

        </div>
        <div className="perfil-nome-tipo">
          <h2 className="perfil-nome">{user.nome}</h2>
          <span className="perfil-tipo">{user.tipoUsuario}</span>
        </div>
      </div>

      <div className="perfil-info-blocos">
        <div className="perfil-info-bloco">{user.email}</div>
        <div className="perfil-info-bloco">{user.cpfcnpj}</div>
        {/* <div className="perfil-info-bloco">{user.telefone}</div> */}
        <div className="perfil-info-bloco">61993405115</div>
        <button className='avaliacoes' onClick={handleReviews}>
            <span>Avaliações</span>
            <span className="seta">{'>'}</span>
        </button>
      </div>
      <div className='footerContainer'>
        <Footer />
      </div>
    </div>
  );
};

export default Perfil;