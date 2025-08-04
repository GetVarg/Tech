import React, { useEffect, useState } from 'react';
import './Reviews.css';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useUser } from '../UserContext';

const Reviews = () => {
  const [tab, setTab] = useState('passageiro');
  const [reviews, setReviews] = useState([]);
  const [estrelas, setEstrelas] = useState([0, 0, 0, 0, 0]);
  const [nota, setNota] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchReviews = async () => {
      console.log(user.uid);
      if (!user?.uid) return;

      try {
        const q = query(collection(db, 'Reviews'), where('destinoUid', '==', user.uid));
        const snapshot = await getDocs(q);

        const fetchedReviews = [];
        const count = [0, 0, 0, 0, 0]; // index 0 = 5 estrelas, index 4 = 1 estrela
        let somaNotas = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.nota >= 1 && data.nota <= 5) {
            count[5 - data.nota] += 1;
            somaNotas += data.nota;
            fetchedReviews.push(data);
          }
        });

        const total = fetchedReviews.length;
        setEstrelas(count);
        setNota(total > 0 ? (somaNotas / total).toFixed(2) : null);
        setReviews(fetchedReviews);
      } catch (err) {
        console.error('Erro ao buscar reviews:', err);
      }
    };

    fetchReviews();
  }, [user]);

  return (
    <div className="reviews-container">
      <button className="back-button" onClick={() => navigate('/perfil')}>
        ⬅
      </button>

      <div className="reviews-tabs">
        <button
          className={tab === 'passageiro' ? 'active' : ''}
          onClick={() => setTab('passageiro')}
        >
          Sua nota
        </button>
        <button
          className={tab === 'motorista' ? 'active' : ''}
          onClick={() => setTab('motorista')}
        >
          Suas Avaliações
        </button>
      </div>

      <hr className="divider" />

      <div className="reviews-header">

        <p>Sua avaliação é <strong>{nota ?? 'N/A'}</strong></p>
      </div>

      <hr className="divider" />

      <div className="reviews-bars">
        {[5, 4, 3, 2, 1].map((estrela, i) => (
          <div className="bar-row" key={estrela}>
            <span>{estrela} estrela{estrela > 1 ? 's' : ''}</span>
            <div className="bar-container">
              <div
                className="bar-fill"
                style={{ width: `${(estrelas[5 - estrela] / (estrelas[0] || 1)) * 100}%` }}
              />
            </div>
            <span>{estrelas[5 - estrela]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
