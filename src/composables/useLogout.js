import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";


const logout = async () => {
 await signOut(auth);
}

const useLogout = () => {
   return {logout}
}

export default useLogout;