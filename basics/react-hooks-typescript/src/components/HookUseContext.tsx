import { createContext } from "react";

interface IAction {
	type: string;
}

export interface ISomeContext {
	context: string;
	dispatch?: React.Dispatch<IAction>;
}

export const SomeContext = createContext<ISomeContext>({
	context: "",
	dispatch: () => undefined,
});

export const HookUseContext = ({ children }: { children: any }) => {
	const context = "testing context";

	return (
		<>
			{SomeContext && (
				<SomeContext.Provider value={{ context }}>
					{children}
				</SomeContext.Provider>
			)}
		</>
	);
};
