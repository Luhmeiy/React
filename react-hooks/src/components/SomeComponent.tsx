import { forwardRef, useImperativeHandle, useRef } from "react";

type SomeComponentProps = {};

type SomeComponentHandle = {
	validate: () => void;
};

const SomeComponent = forwardRef<SomeComponentHandle, SomeComponentProps>(
	(props, ref) => {
		const localInputRef = useRef<HTMLInputElement>(null);

		useImperativeHandle(ref, () => {
			return {
				validate: () => {
					if (
						localInputRef.current &&
						localInputRef.current.value.length > 3
					) {
						localInputRef.current.value = "";
					}
				},
			};
		});

		return (
			<div>
				<p>Enter a maximum of 3 characters:</p>
				<input type="text" ref={localInputRef} />
			</div>
		);
	}
);

export default SomeComponent;
