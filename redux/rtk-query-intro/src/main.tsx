import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

import App from "./App.tsx";
import "./index.scss";
import { todoApi } from "./features/api/todoApi.ts";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ApiProvider api={todoApi}>
			<App />
		</ApiProvider>
	</StrictMode>
);
