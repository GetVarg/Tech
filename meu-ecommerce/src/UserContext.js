import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("[Contexto] Provider montou");
  useEffect(() => {
    console.log("[Contexto] Provider Inicializou");
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log("[Contexto] Usuário autenticado:", firebaseUser.uid);
        const docRef = doc(db, "Clients", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("[Contexto] Documento encontrado no Firestore:", docSnap.data());
          setUser({ uid: firebaseUser.uid, ...docSnap.data() });
        } else {
          console.log("[Contexto] Documento não encontrado");
          setUser(null);
        }
      } else {
        console.log("[Contexto] Nenhum usuário autenticado");
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      console.log("limpando");
      unsubscribe(); // <- importante para evitar memory leak
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);