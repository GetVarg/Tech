import React from 'react';
import { useState } from 'react';

const InputEspecifico = ({ tipo, setNumeroComodos, setTipoResidencia, tipoResidencia, setResidenciaDropdownAberto, residenciaDropdownAberto }) => {
  const [erro, setErro] = useState('');

  function handleNumeroComodo(e) {
    const value = e.target.value;
    if (value === ''){
      setErro('Numero de comodos invalidos');
    } else if (/^-?\d+$/.test(value)) {
      setNumeroComodos(parseInt(value, 10));
    }
    else{
      setErro('Numero de comodos invalidos');
    }
  }

  return (
    <div className="servico-card">
      <h4>{tipo}</h4>

      {tipo === 'Faxina' && (
        <>
          <input
            type="number"
            onChange={handleNumeroComodo}
            placeholder="Quantos cômodos precisarão de faxina?"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <div style={{ position: 'relative', marginTop:'8px' }}>
            <div
              onClick={() => setResidenciaDropdownAberto((prev) => !prev)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                backgroundColor: 'white'
              }}
            >
              {tipoResidencia || 'Selcione o tipo de Residência'}
            </div>
            {residenciaDropdownAberto && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  width: '100%',
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginTop: '4px',
                  zIndex: 10,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
                }}
              >
                {['Kitnet', 'Apartamento', 'Casa'].map((opcao) => (
                  <div
                    key={opcao}
                    onClick={() => {
                      setTipoResidencia(opcao);
                      setResidenciaDropdownAberto(false);
                    }}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    {opcao}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InputEspecifico;