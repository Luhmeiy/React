import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./features/auth/Welcome";
import UsersList from "./features/users/UsersList";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Public />} />
				<Route path="login" element={<Login />} />

				<Route element={<RequireAuth />}>
					<Route path="welcome" element={<Welcome />} />
					<Route path="userslist" element={<UsersList />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
