interface photoData {
	_id?: string;
	photos?: [];
	loading?: boolean;
	message?: string;
	error?: string;
}

export interface initialStateData {
	user?: any;
	error: boolean | Error | null;
	success: boolean;
	loading: boolean;
	auth?: any;
	message?: string | null;
	photos?: photoData[];
	photo?: photoData;
}
