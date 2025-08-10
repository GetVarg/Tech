import { doc, getDoc, collection, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { uploadImages } from './uploadFoto';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function calculoPreco(precoHora, tipoResidencia, numeroComodos) {
    const fatores = {
        Casa: 1.44,
        Apartamento: 1,
        Kitnet: 0.64,
    }

    const ft = fatores[tipoResidencia];

    return ft*numeroComodos*precoHora;
}

/**
 * Cria um documento em /servicos com os dados do novo serviço.
 * @param {{
 *   clienteUid: string,
 *   tipoServico: string,
 *   tipoResidencia?: 'Kitnet'|'Apartamento'|'Casa'|string,
 *   numeroComodos?: number|string,
 *   descricao: string,
 *   imagensUrls?: string[],   // URLs já no Storage (opcional)
 *   endereco?: object,        // { rua, numero, bairro, cidade, uf, cep }
 *   precoEstimado?: number,
 *   meta?: object             // extras flexíveis
 * }} payload
 * @returns {Promise<string>} id do documento criado
 */

export async function AddService(precoHora, data, imagens) {  
    const auth = getAuth();
    
    const user = auth.currentUser;

    const servicosRef = doc(collection(db, 'Servicos'));
    
    const { userUid: _dropUid, userId: _dropId, imagens: _dropImgs, files: _dropFiles, ...safeData } = data || {};

    await setDoc(servicosRef, {
        ...data,
        userUid: user.uid,
        status: 'rascunho',
        createdAt: serverTimestamp(),
        precoEstimado: calculoPreco(precoHora, data.tipoResidencia, data.numeroComodos),
    });

    const snap = await getDoc(servicosRef);
    console.log('userUid salvo =', snap.data()?.userUid); // deve imprimir o uid

    const uploaded = imagens && imagens.length ? await uploadImages(servicosRef.id, imagens) : [];
    await updateDoc(servicosRef, {
        storageIds: uploaded.map(x => x.id),
        imagens: uploaded.map(x => x.url),
        status: 'aberto',
    });

    return {id: servicosRef.id}
}