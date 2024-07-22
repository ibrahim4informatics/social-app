import { getStorage, getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import firebaseConf from '../../config/firebase.conf.js'

const storage = getStorage(firebaseConf)

export default async (file, user_id) => {

    try {

        const storageRef = ref(storage, `${user_id}/${Date.now()}-${file.name}`);
        const metaData = {
            contentType: file.mimetype
        }

        const snapshot = await uploadBytesResumable(storageRef, file.data, metaData)
        const url = await getDownloadURL(snapshot.ref);
        return url
    }
    catch (err) {
        console.log(err)
        return -1
    }


}