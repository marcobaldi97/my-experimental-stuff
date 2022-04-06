import React from "react";

import styles from "./todoitem.module.scss";

export type TodoItemProps = {
	index: number;
	todo: string;
	onCrossClick: (index: number) => void;
};

export default function TodoItem(props: TodoItemProps) {
	const { index, todo, onCrossClick } = props;

	return (
		<li key={index} className={styles.container}>
			<div className={styles.content}>
				<p>{todo}</p>
				<button onClick={() => onCrossClick(index)}>❌</button>
			</div>
		</li>
	);
}
