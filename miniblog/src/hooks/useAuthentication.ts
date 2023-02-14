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

interface LoginProps {
    email: string;
    password: string;
}

interface CreateUserProps extends LoginProps {
    displayName: string;
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

    const createUser = async (data: CreateUserProps) => {
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

                let systemErrorMessage;

                if (error.message.includes("Password")) {
                    systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
                }
                else if (error.message.includes("email-already")) {
                    systemErrorMessage = "Email já cadastrado";
                }
                else {
                    systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
                }

                setError(systemErrorMessage);
                setLoading(false);
            }
        }
    }

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    }

    const login = async(data: LoginProps) => {
        checkIfIsCancelled();
        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                let systemErrorMessage;

                if (error.message.includes("user-not-found")) {
                    systemErrorMessage = "Usuário não encontrado.";
                }
                else if (error.message.includes("wrong-password")) {
                    systemErrorMessage = "Senha incorreta.";
                } else {
                    systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
                }

                setError(systemErrorMessage);
                setLoading(false);
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
        loading,
        login,
        logout
    }
}