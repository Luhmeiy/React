// components
import HookUseEffect from "../components/HookUseEffect";
import HookUseReducer from "../components/HookUseReducer";
import HookUseState from "../components/HookUseState";
import { SomeContext } from "../components/HookUseContext";
import HookUseRef from "../components/HookUseRef";
import HookUseCallback from "../components/HookUseCallback";
import HookUseMemo from "../components/HookUseMemo";
import HookUseLayoutEffect from "../components/HookUseLayoutEffect";
import HookUseImperativeHandle from "../components/HookUseImperativeHandle";
import HookCustom from "../components/HookCustom";

// React
import { useContext } from "react";

const Home = () => {
	// const { context } = useContext(SomeContext);

	return (
		<div>
			{/* <HookUseState /> */}
			{/* <HookUseReducer /> */}
			{/* <HookUseEffect /> */}
			{/* <h2>useContext</h2>
			<p>Context value: {context}</p> */}
			{/* <HookUseRef /> */}
			{/* <HookUseCallback /> */}
			{/* <HookUseMemo /> */}
			{/* <HookUseLayoutEffect /> */}
			{/* <HookUseImperativeHandle /> */}
			<HookCustom />
		</div>
	);
};

export default Home;
