// components
import Footer from './components/Footer';
import Header from './components/Header';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

// interface
import { ITask } from "./interfaces/Task";

// React
import { useState } from 'react';

// styles / SCSS
import styles from "./App.module.scss";

function App() {
	const [taskList, setTaskList] = useState<ITask[]>([]);
	const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

	const deleteTask = (id: number) => {
		setTaskList(
			taskList.filter(task => {
				return task.id !== id;
			})
		)
	}

	const hideOrShowModal = (display: boolean) => {
		const modal = document.getElementById("modal");

		if (display) {
			modal!.classList.remove("hide");
		} else {
			modal!.classList.add("hide");
		}
	}

	const editTask = (task: ITask):void => {
		hideOrShowModal(true);
		setTaskToUpdate(task);
	}

	const updateTask = (id: number, title: string, difficulty: number) => {
		const updatedTask: ITask = {id, title, difficulty};

		const updatedItems = taskList.map(task => {
			return task.id === updatedTask.id ? updatedTask : task;
		});

		setTaskList(updatedItems);
		hideOrShowModal(false);
	}

	return (
		<div>
			<Modal 
				children={
					<TaskForm
						btnText="Edit task"
						taskList={taskList}
						task={taskToUpdate}
						handleUpdate={updateTask}
					/>
				}
			/>
			<Header />
			<main className={styles.main}>
				<div>
					<h2 className={styles['main__heading-2']}>What are you gonna do?</h2>
					<TaskForm
						btnText="Create task"
						taskList={taskList}
						setTaskList={setTaskList}
					/>
				</div>

				<div>
					<h2 className={styles['main__heading-2']}>Your tasks:</h2>
					<TaskList
						taskList={taskList}
						handleDelete={deleteTask}
						handleEdit={editTask}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default App;