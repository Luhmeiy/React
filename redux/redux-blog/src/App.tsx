import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import AddPostForm from "./pages/AddPostForm";
import PostsList from "./pages/PostsList";
import SinglePostPage from "./pages/SinglePostPage";
import EditPostForm from "./pages/EditPostForm";
import UsersList from "./pages/UsersList";
import UserPage from "./pages/UserPage";
import Error404 from "./pages/Error404";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<PostsList />} />

				<Route path="post">
					<Route index element={<AddPostForm />} />
					<Route path=":postId" element={<SinglePostPage />} />
					<Route path="edit/:postId" element={<EditPostForm />} />
				</Route>

				<Route path="user">
					<Route index element={<UsersList />} />
					<Route path=":userId" element={<UserPage />} />
				</Route>

				<Route path="*" element={<Error404 />} />
			</Route>
		</Routes>
	);
}

export default App;
