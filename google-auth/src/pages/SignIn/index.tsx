// Firebase
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { auth } from '../../services/firebase';

// icons
import { GoogleLogo } from 'phosphor-react';

// React
import { useState } from 'react';

const SignIn = () => {
	const [user, setUser] = useState<User>({} as User);

	function handleGoogleSignIn() {
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider)
			.then((res) => {
				setUser(res.user);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<div className="w-screen h-screen flex flex-col flex-1 justify-center items-center">
			<div className="flex flex-col items-center mb-16">
				{user.photoURL && 
					<img
						src={user.photoURL}
						alt="User photo"
						className="w-36 h-36 rounded-[72px] mb-4"
					/>
				}
				<strong>{user.displayName}</strong>
				<small>{user.email}</small>
			</div>

			<h1 className="text-4xl mb-3 font-bold">Acesse sua conta</h1>

			<span className="text-caption">Utilizando autenticação social, por exemplo, autenticação com a Google você <br />
			facilita a vida do usuário permitindo utilizar sua aplicação sem fazer cadastro.</span>
			
			<button
				type="button"
				className="cursor-pointer h-14 w-[650px] linear bg-gradient-to-r from-primary to-gray p-1 mt-8"
				onClick={handleGoogleSignIn}
			>
				<span className="h-full w-full flex items-center justify-center bg-background  font-poppins text-lg hover:bg-zinc-800 transition-colors">
					<GoogleLogo className="text-2xl mr-2" />
					Entrar com Google
				</span>
			</button>
		</div>
	)
}

export default SignIn;