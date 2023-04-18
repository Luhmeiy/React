export interface initialStateData {
	user: any;
	error: boolean | Error | null;
	success: boolean;
	loading: boolean;
	auth?: any;
	message?: string | null;
}
