import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseConf from '../../config/firebase.conf.js';

const storage = getStorage(firebaseConf);

export default async (file_path) => {
    const fileRef = ref(storage, file_path);
    try {

        await deleteObject(fileRef);
        return true
    }

    catch (err) {
        console.log(err);
        return false;
    }
}