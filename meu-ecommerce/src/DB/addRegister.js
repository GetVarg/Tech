import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove pontos e traços

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;

  return true;
}

export default async function handleRegister(name, password, email, cpfcnpj){
    try {
        if (!isValidCPF(cpfcnpj)) return "CPF inválido";

        const clientsRef = collection(db, "Clients");
        const q = query(clientsRef, where("cpfcnpj", "==", cpfcnpj));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log("CPF já cadastrado");
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
            NextServices: [],
        })
        return true
    } catch(error) {
        return error.message;
    }
}