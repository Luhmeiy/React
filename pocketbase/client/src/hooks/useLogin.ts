import pb from "../lib/pocketbase";
import { useMutation } from "react-query";

export default function useLogin() {
	async function login({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) {
		await pb.collection("users").authWithPassword(email, password);
	}

	return useMutation(login);
}
