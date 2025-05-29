import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // ajuste o caminho se precisar

export default function AuthWatcher() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // <- adiciona controle de loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
      } else {
        navigate('/login');
      }
      setLoading(false); // <- só define loading como false depois que Firebase responde
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // <- opcionalmente pode mostrar um loader

  return null;
}