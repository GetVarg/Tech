import React, { useEffect, useState } from 'react';
import './Reviews.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

import ReviewCard from '../components/ReviewCard';

const Reviews = () => {
  const [tab, setTab] = useState('passageiro');
  const [reviews, setReviews] = useState([]);
  const [estrelas, setEstrelas] = useState([0, 0, 0, 0, 0]);
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [notaMedia, setNotaMedia] = useState(null);

  useEffect(() => {
    if (!user?.reviews) return;

    const fetchedReviews = [];
    const count = [0, 0, 0, 0, 0];
    let somaNotas = 0;

    user.reviews.forEach((data) => {
      if (data.nota >= 1 && data.nota <= 5) {
        count[5 - data.nota] += 1;
        somaNotas += data.nota;
        fetchedReviews.push(data);
      }
    });

    const total = fetchedReviews.length;
    setEstrelas(count);
    setNotaMedia(total > 0 ? (somaNotas / total).toFixed(2) : null);
    setReviews(fetchedReviews);
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

        {tab === 'passageiro' ? (
        <>
            <div className="reviews-header">
            <p>Sua avaliação é <strong>{notaMedia ?? 'N/A'}</strong></p>
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
        </>
        ) : (
        <div className="reviews-cards">
            {reviews.length > 0 ? (
            reviews.map((review, i) => (
                <ReviewCard 
                key={i}
                nota={review.nota}
                comentario={review.descricao}
                imagens={["https://firebasestorage.googleapis.com/v0/b/techbusiness-1ebaf.firebasestorage.app/o/uploads%2Fajeita-capybara.png?alt=media&token=95c67030-12e0-4cef-99ba-baa071f20d43",
                    "https://firebasestorage.googleapis.com/v0/b/techbusiness-1ebaf.firebasestorage.app/o/uploads%2Fajeita-capybara.png?alt=media&token=95c67030-12e0-4cef-99ba-baa071f20d43",
                    "https://firebasestorage.googleapis.com/v0/b/techbusiness-1ebaf.firebasestorage.app/o/uploads%2Fajeita-capybara.png?alt=media&token=95c67030-12e0-4cef-99ba-baa071f20d43",
                    "https://firebasestorage.googleapis.com/v0/b/techbusiness-1ebaf.firebasestorage.app/o/uploads%2Fajeita-capybara.png?alt=media&token=95c67030-12e0-4cef-99ba-baa071f20d43",
                ]}
                />
            ))
            ) : (
            <p className="no-reviews">Nenhuma avaliação encontrada.</p>
            )}
        </div>
        )}
    </div>
    );

};

export default Reviews;
