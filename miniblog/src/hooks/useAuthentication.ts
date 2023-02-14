// libraries
import {auth} from "../services/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';

// React
import {useState, useEffect} from 'react';

interface IData {
    displayName: string;
    email: string;
    password: string;
}

export const useAuthentication = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data: IData) => {
        checkIfIsCancelled();

        setLoading(true);
        setError("");

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                console.log(typeof error.message);

                let systemErrorMessage

                if (error.message.includes("Password")) {
                    systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
                }
                else if (error.message.includes("email-already")) {
                    systemErrorMessage = "Email já cadastrado"
                }
                else {
                    systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
                }

                setLoading(false);
                setError(systemErrorMessage);
            }
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading
    }
}