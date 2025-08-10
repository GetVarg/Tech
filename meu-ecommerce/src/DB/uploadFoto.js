import {ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

export async function uploadImages(IdServico, files){
    const storage = getStorage();
    
    const res = await Promise.all(
        files.map(async(image, idx) => {
            const ext = (image.name?.split('.').pop() || 'jpg').toLowerCase();
            const safeName = `${Date.now()}-${idx}.${ext}`.replace(/[^\w.\-]/g, '_');
            const fileRef = ref(storage, `servicos/${IdServico}/${safeName}`);

            await uploadBytes(fileRef, image, { contentType: image.type || `image/${ext}` });
            const url = await getDownloadURL(fileRef);

            return {
                id: fileRef.fullPath,
                url,
                name: safeName,
                contentType: image.type || `image/${ext}`,
                size: image.size,
            };
        })
    )

    return res;
}