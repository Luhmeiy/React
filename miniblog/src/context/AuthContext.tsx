import { User } from "firebase/auth";
import { createContext, ReactNode, useContext } from "react";

interface AuthProps {
	children: ReactNode;
}

interface AuthContextProps {
	user: User;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children, value }: AuthProps & { value: User }) {
	return (
		<AuthContext.Provider value={{ user: value }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthValue() {
	return useContext(AuthContext);
}
