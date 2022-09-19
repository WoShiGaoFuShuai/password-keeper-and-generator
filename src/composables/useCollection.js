import { db } from "@/firebase/config";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref } from "vue";

const useCollection = (collectionName) => {
  const isPending = ref(false);
  const error = ref(null);
  const colRef = collection(db, collectionName);

  const addDocument = async (data) => {
    isPending.value = true;
    error.value = null;

    try {
      await addDoc(colRef, data);
      isPending.value = false;
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
    }
  };

  const delDocument = async (data) => {
    let docRef = doc(db, "allUsersData", data.id);
    deleteDoc(docRef);
  };

  return { addDocument, isPending, error, delDocument };
};

export default useCollection;
