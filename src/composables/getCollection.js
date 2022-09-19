import { db } from "@/firebase/config";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { ref, watchEffect } from "vue";


const getCollection =  (collectionName, queryForm) => {
   const documents = ref(null);
   let colRef =  collection(db, collectionName);

   if (queryForm) {
      colRef = query(colRef, where(...queryForm)); 
   }

   const unsub = onSnapshot(colRef, snapshot => {
      let result = [];
      snapshot.docs.forEach(doc => {
         result.push({...doc.data(), id: doc.id})
      })
      documents.value = result;
   })

   watchEffect((onInvalidate) => {
      onInvalidate(() => unsub());
   })

   return {documents}
}

export default getCollection;