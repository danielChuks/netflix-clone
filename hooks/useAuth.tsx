import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
  
  import { useRouter } from 'next/router'
  import {createContext, useContext, useEffect, useMemo, useState } from 'react'
  import {auth} from '../firebase'


  

  interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null 
    loading: boolean
  }

  
const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error:  null,
  loading: false,

})

//ReactNode is the interface for children......
interface AuthProviderProps {
  children: React.ReactNode
}
  // we then export the hook function  AuthProvider  --- the interface of the children can be any name.
export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null >();
    const [error, setError] = useState(null);
    const [intialLoading, setInitialLoading] = useState(true)
    const router = useRouter();


    useEffect(
      () =>
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // Logged in...
            setUser(user)
            setLoading(false)
          } else {
            // Not logged in...
            setUser(null)
            setLoading(true)
            router.push('/login')
          }
  
          setInitialLoading(false)
        }),
      [auth]
    )

    //signUp function for firebase
    const signUp = async (email: string, password: string) => {
        setLoading(true)

       await createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
                setUser(userCredential.user);
                router.push('/');
                setLoading(false)
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(true))
    }
    
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


    //logout function 
    const logout = async () => {
        setLoading(true)
        
        await signOut(auth)
        .then(() => setUser(null))
        .catch((error) => error.message)
        .finally(() => setLoading(false))  
    }

    /**
     * This useMemo hook works like useEffect runs the code based on the value. user or loading 
     */
  const memoedValue = useMemo(() => ({ 
    user, 
    signUp, 
    signIn, 
    logout, 
    loading, 
    error }), [user,  loading ])

  
  return (
    <AuthContext.Provider value={memoedValue}>{!intialLoading && children}</AuthContext.Provider>
  ) 
}

export default function useAuth(){
  return useContext(AuthContext)
}
