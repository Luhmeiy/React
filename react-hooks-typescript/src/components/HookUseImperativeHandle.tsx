// components
import SomeComponent from "./SomeComponent";

// React
import { useRef } from "react";

interface IComponentRef {
	validate: () => void;
}

const HookUseImperativeHandle = () => {
	const componentRef = useRef<IComponentRef>(null);

	return (
		<div>
			<h2>useImperativeHandle</h2>
			<SomeComponent ref={componentRef} />
			<button
				onClick={() => {
					componentRef.current && componentRef.current.validate();
				}}
			>
				Validate
			</button>
		</div>
	);
};

export default HookUseImperativeHandle;
