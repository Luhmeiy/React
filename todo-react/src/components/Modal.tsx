// React
import React from 'react';

// styles / SCSS
import styles from "./Modal.module.scss";

type Props = {
	children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
	const closeModal = (e: React.MouseEvent): void => {
		const modal = document.getElementById("modal");
		modal!.classList.add("hide");
	}

	return (
		<div className={`${styles["modal-container"]} hide`} id="modal">
			<div className={styles.fade} onClick={closeModal}></div>
			<div className={styles.modal}>
				<h2 className={styles.modal__title}>Modal text</h2>
				{children}
			</div>
		</div>
	)
}

export default Modal;