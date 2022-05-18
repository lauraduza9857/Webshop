import {db} from "./../general";
import {doc, getDoc} from "firebase/firestore";

async function getPrdduct (id) {
    const docRef = doc(db, "products",id);
    try {
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        return data;
    } catch (error) {
        alert(error.message)
    }
}

export default  getPrdduct;