// bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";

// interface
import { ITask } from "../interfaces/Task";

// styles / SCSS
import styles from "./TaskList.module.scss";

interface Props {
	taskList: ITask[];
	handleDelete(id: number): void;
	handleEdit(task: ITask): void;
}

const TaskList = ({ taskList, handleDelete, handleEdit }: Props) => {
	return (
		<>
			{taskList.length > 0 ? (
				taskList.map(task => (
					<div className={styles.task} key={task.id}>
						<div className={styles.task__details}>
							<h4 className={styles.task__heading}>{task.title}</h4>
							<p>Difficulty: {task.difficulty}</p>
						</div>
						
						<div className={styles.task__actions}>
							<i className="bi bi-pencil" onClick={() => {handleEdit(task)}}></i>
							<i className="bi bi-trash" onClick={() => {handleDelete(task.id)}}></i>
						</div>
					</div>
				))
			) : (
				<p>There is no task!</p>
			)}
		</>
	)
}

export default TaskList;