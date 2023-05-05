import { createContext, useContext, useEffect, useState } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    UserCredential,
    User,
} from "firebase/auth";
import { auth } from "../../firebase";

type UserAuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};


const userAuthContext = createContext<UserAuthContextType>({
    isLoggedIn: false,
    setIsLoggedIn: () => null,
});

export function UserAuthContextProvider({ children, }: { children: React.ReactNode; }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         console.log("Auth", currentUser);
    //         setUser(currentUser);
    //     });

    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);

    return (
        <userAuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </userAuthContext.Provider>
    );
}

export function useUserAuth() {
    return useContext(userAuthContext);
}



