// interface
import { ITask } from "../interfaces/Task";

// React
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

// styles / SCSS
import styles from "./TaskForm.module.scss";

interface Props {
	btnText: string;
	taskList: ITask[];
	setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
	task?: ITask | null;
	handleUpdate?(id: number, title: string, difficulty: number): void;
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {
	const [id, setId] = useState<number>(0);
	const [title, setTitle] = useState<string>("");
	const [difficulty, setDifficulty] = useState<number>(0);

	useEffect(() => {
		if (task) {
			setId(task.id);
			setTitle(task.title);
			setDifficulty(task.difficulty);
		}
	}, [task]);

	const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (handleUpdate) {
			handleUpdate(id, title, difficulty);
		} else {
			const id = Math.floor(Math.random() * 1000);
			const newTask: ITask = {id, title, difficulty};
	
			setTaskList!([...taskList, newTask]);
	
			setTitle("");
			setDifficulty(0);
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "title") {
			setTitle(e.target.value);
		} else {
			setDifficulty(parseInt(e.target.value));
		}
	}

	return (
		<form className={styles.form} onSubmit={addTaskHandler}>
			<div className={styles["form__input-container"]}>
				<label className={styles.form__label} htmlFor="title">Title:</label>
				<input type="text"  className={styles.form__input} name="title" placeholder="Task title" value={title} onChange={handleChange} />
			</div>

			<div className={styles["form__input-container"]}>
				<label className={styles.form__label} htmlFor="difficulty">Difficulty:</label>
				<input type="text"  className={styles.form__input} name="difficulty" placeholder="Task difficulty" value={difficulty} onChange={handleChange} />
			</div>

			<input type="submit" className={styles.form__submit} value={btnText} />
		</form>
	)
}

export default TaskForm;