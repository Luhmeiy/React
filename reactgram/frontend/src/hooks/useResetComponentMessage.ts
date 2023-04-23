// Redux
import { resetMessage } from "../slices/userSlice";
import { AppDispatch } from "../types/AppDispatch";

export const useResetComponentMessage = (dispatch: AppDispatch) => {
	return () => {
		setTimeout(() => {
			dispatch(resetMessage());
		}, 2000);
	};
};
