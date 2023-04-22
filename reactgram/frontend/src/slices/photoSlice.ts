import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/photoService";
import { initialStateData } from "../interfaces/initialStateData";

const initialState: initialStateData = {
	photos: [],
	photo: {},
	error: false,
	success: false,
	loading: false,
	message: null,
};

interface IPhotoData {
	id: string;
	title: string;
}

// Publish user photo
export const publishPhoto = createAsyncThunk(
	"photo/publish",
	async (photo: FormData, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.publichPhoto(photo, token);

		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

// Get user photos
export const getUserPhotos = createAsyncThunk(
	"photo/userphotos",
	async (id: string, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.getUserPhotos(id, token);

		return data;
	}
);

// Delete a photo
export const deletePhoto = createAsyncThunk(
	"photo/delete",
	async (id: string, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.deletePhoto(id, token);

		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

// Update a photo
export const updatePhoto = createAsyncThunk(
	"photo/update",
	async (photoData: IPhotoData, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;

		const data = await photoService.updatePhoto(
			{ title: photoData.title },
			photoData.id,
			token
		);

		// Check for errors
		if (data.errors) {
			return thunkAPI.rejectWithValue(data.errors[0]);
		}

		return data;
	}
);

// Funções
export const photoSlice = createSlice({
	name: "photo",
	initialState,
	reducers: {
		resetMessage: (state) => {
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Publish photo
			.addCase(publishPhoto.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(publishPhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;
				state.photo = action.payload;
				state.photos!.unshift(state.photo!);
				state.message = "Foto publicada com sucesso!";
			})
			.addCase(publishPhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as Error;
				state.photo = {};
			})
			// Get user photos
			.addCase(getUserPhotos.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(getUserPhotos.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;
				state.photos = action.payload!;
			})
			// Delete photo
			.addCase(deletePhoto.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(deletePhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;

				state.photos = state.photos?.filter((photo) => {
					return photo._id !== action.payload.id;
				});

				state.message = action.payload.message;
			})
			.addCase(deletePhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as Error;
				state.photo = {};
			})
			// Update photo
			.addCase(updatePhoto.pending, (state) => {
				state.loading = true;
				state.error = false;
			})
			.addCase(updatePhoto.fulfilled, (state, action) => {
				state.loading = false;
				state.success = true;
				state.error = null;

				state.photos!.map((photo) => {
					if (photo._id === action.payload.photo._id) {
						return (photo.title = action.payload.photo.title);
					}

					return photo;
				});

				state.message = action.payload.message;
			})
			.addCase(updatePhoto.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as Error;
				state.photo = {};
			});
	},
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
