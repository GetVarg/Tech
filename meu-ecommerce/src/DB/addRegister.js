import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf[i]) * (10 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf[i]) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;

  return resto === parseInt(cpf[10]);
}

export default async function handleRegister(name, password, email, cpfcnpj, telefone, tipoUsuario){
    try {
        if (!isValidCPF(cpfcnpj)) return "CPF inválido";

        const clientsRef = collection(db, "Clients");
        const q = query(clientsRef, where("cpfcnpj", "==", cpfcnpj));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return "CPF já cadastrado";
        } else{
            console.log(querySnapshot);
        }
        
        const credential = await createUserWithEmailAndPassword(auth, email, password);

        const uid = credential.user.uid;

        await setDoc(doc(db, "Clients", uid), {
            nome: name,
            email: email,
            cpfcnpj: cpfcnpj,
            telefone: telefone,
            tipoUsuario: tipoUsuario,
        })
        return true
    } catch(error) {
        return false;
    }
}