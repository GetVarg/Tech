import {ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const uploadFoto = async (file) => {
    const storageRef = ref(storage, `fotos-perfil/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};