import { useReducer, useState } from "react";

type State = {
	id: number;
	text: string;
}[];

type Action = {
	id?: number;
	type: string;
};

const HookUseReducer = () => {
	const initialTaks = [
		{ id: 1, text: "Do something" },
		{ id: 2, text: "Do another thing" },
	];

	const taskReducer = (state: State, action: Action) => {
		switch (action.type) {
			case "ADD":
				const newTask = {
					id: Math.random(),
					text: taskText,
				};

				setTaskText("");

				return [...state, newTask];

			case "DELETE":
				return state.filter((task) => task.id !== action.id);

			default:
				return state;
		}
	};

	const [taskText, setTaskText] = useState("");
	const [tasks, dispatchTasks] = useReducer(taskReducer, initialTaks);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatchTasks({ type: "ADD" });
	};

	const removeTask = (id: number) => {
		dispatchTasks({ type: "DELETE", id });
	};

	return (
		<div>
			<h2>useReducer</h2>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={(e) => setTaskText(e.target.value)}
					value={taskText}
				/>
				<button onClick={dispatchTasks}>Change number!</button>
			</form>

			<ul>
				{tasks.map((task) => (
					<li key={task.id} onDoubleClick={() => removeTask(task.id)}>
						{task.text}
					</li>
				))}
			</ul>
		</div>
	);
};

export default HookUseReducer;
