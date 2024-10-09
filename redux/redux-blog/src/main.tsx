import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.scss";
import { store } from "./app/store.ts";
import { fetchUsers } from "./features/users/usersSlice.ts";
import { fetchPosts } from "./features/posts/postsSlice.ts";

import App from "./App.tsx";

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<App />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);
