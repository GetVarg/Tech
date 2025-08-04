import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import React, { useEffect } from 'react';

export default function getReviews(userId) {
    const fetchReviews = async () => {

      try {
        const q = query(collection(db, 'Reviews'), where('destinoUid', '==', userId));
        const snapshot = await getDocs(q);

        return snapshot;

      } catch (err) {
        console.error('Erro ao buscar reviews:', err);
      }
    };

    return fetchReviews();
}
