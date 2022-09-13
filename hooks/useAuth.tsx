import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
  
  import { useRouter } from 'next/router'
  import { useContext, useEffect, useMemo, useState } from 'react'
  import {auth} from '../firebase'


function useAuth() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null >();
    const router = useRouter();


    //signUp function for firebase
    const signUp = async (email: string, password: string) => {
        setLoading(true)

       await  createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
                setUser(userCredential.user);
                router.push('/');
                setLoading(false)
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(true))
    
    //signIn function from fire base
    const signIn = async (email: string, password: string) => {
      setLoading(true)
      
      await signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
               setUser(userCredential.user);
              router.push('/');
              setLoading(false)
           })
          .catch((error) => alert(error.message))
          .finally(() => setLoading(true))
  }

  const logout = async () => {
    setLoading(true)
    
    await signOut(auth)
    .then(() => setUser(null))
    .catch((error) => error.message)
    .finally(() => setLoading(false))  
  }

    }
  return
}

export default useAuth;