export interface photoData {
	_id?: string;
	title?: string;
	photos?: [];
	loading?: boolean;
	message?: string;
	error?: string;
	image?: string;
	userId?: string;
	userName?: string;
	photo?: any;
	likes?: any[];
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
