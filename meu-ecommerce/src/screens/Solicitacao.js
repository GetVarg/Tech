import React, { useState, useRef, useEffect } from 'react';
import InputEspecifico from '../components/InputEspecifico';
import { useUser } from "../UserContext.js";
import { AddService } from '../DB/AddService_Faxina.js';

import './Solicitacao.css';
import { connectDataConnectEmulator } from 'firebase/data-connect';

const Solicitacao = () => {
  const { user } = useUser();
  const [tipoServico, setTipoServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagens, setImagens] = useState([]);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [tipoResidencia, setTipoResidencia] = useState('');
  const [numeroComodos, setNumeroComodos] = useState('');
  const [residenciaDropdownAberto, setResidenciaDropdownAberto] = useState(false);

  const tipos = ['Faxina'];

  const dropdownRef = useRef(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImagens(prev => [...prev, ...files]);
  };

  function remover(i){
    setImagens(prev => prev.filter((_, idx) => idx !==i));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tipoServico === 'Faxina') {
      try {
        const servicoData = {
          tipoServico,
          descricao,
          numeroComodos,
          tipoResidencia,
        };
        
        const id = await AddService(50, servicoData, imagens);
        console.log("Serviço criado com ID:", id);
      } catch (err) {
        console.error("Erro ao adicionar serviço:", err);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="solicitacao-container">
      <h2>Nova Solicitação</h2>
      <form onSubmit={handleSubmit} className="solicitacao-form">

        <div className="dropdown" ref={dropdownRef}>
          <div
            className="dropdown-button"
            onClick={() => setDropdownAberto((prev) => !prev)}
          >
            {tipoServico? tipoServico:"Selecione o tipo de Serviço"}
          </div>
          {dropdownAberto && (
            <div className="dropdown-options">
              {tipos.map((tipo, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setTipoServico(tipo);
                    setDropdownAberto(false);
                  }}
                >
                  {tipo}
                </div>
              ))}
            </div>
          )}
        </div>

        <textarea
          placeholder="Descrição"
          className='DescricaoBox'
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />

          {/* previews */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 12 }}>
            {imagens.map((file, i) => (
              <div key={i} style={{ position: "relative" }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`img-${i}`}
                  style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 8 }}
                />
                <button
                  type="button"
                  onClick={() => remover(i)}
                  style={{ position: "absolute", top: 4, right: 4 }}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        {tipoServico === 'Faxina' && (
          <InputEspecifico
          tipo={tipoServico}
          setNumeroComodos={setNumeroComodos}
          setTipoResidencia={setTipoResidencia}
          tipoResidencia={tipoResidencia}
          setResidenciaDropdownAberto={setResidenciaDropdownAberto}
          residenciaDropdownAberto={residenciaDropdownAberto}
          />
        )}
        <button
        type="submit"
        disabled={!tipoServico}
        className={tipoServico? 'ativo': 'desativado'}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Solicitacao;
