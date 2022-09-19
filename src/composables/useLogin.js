import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue"


const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
error.value = null;
isPending.value = true;

try {
   const res = await signInWithEmailAndPassword(auth, email, password)

   if (!res) {
      throw Error ('Could not complete signup')
   } 

   error.value = null;
   isPending.value = false;
} catch(err) {
   console.log(err.message);
   error.value = err.message
   isPending.value = false;
}

}


const useLogin = () => {
   return {error, isPending, login}
}

export default useLogin;