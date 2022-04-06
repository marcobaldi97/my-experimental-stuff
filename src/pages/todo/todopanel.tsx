import React, { useCallback, useEffect, useState } from "react";
import Carousel from "./components/carousel/carousel";
import TodoItem from "./components/todoitem/todoitem";

import styles from "./todopanel.module.scss";

export default function TodoPanel() {
	const [todos, setTodos] = useState<string[]>([
		"Learn ReactJS",
		"Going to Party",
	]);
	const [value, setValue] = useState("");
	const [showTimeSetting, setShowTimeSetting] = useState(false);
	const [time, setTime] = useState(new Date());

	const timeOuts: number[] = [];

	useEffect(() => {
		return timeOuts.forEach((timeout) => window.clearTimeout(timeout));
	}, [timeOuts]);

	const onCrossClick = useCallback(
		(index: number) => {
			const newTodos = [...(todos ?? [])];
			newTodos.splice(index, 1);
			setTodos(newTodos);
		},
		[todos]
	);

	const onAddClick = useCallback(() => {
		if (value.trim() === "") return;

		const newTodos = [...(todos ?? []), value];
		setTodos(newTodos);
	}, [todos, value]);

	const onAddWithTimeClick = useCallback(() => {
		if (value.trim() === "") return;

		window.setTimeout(() => {
			const newTodos = [...(todos ?? []), value];
			setTodos(newTodos);
		}, time.getTime() - new Date().getTime());
	}, [todos, value, time]);

	return (
		<div className={styles.container}>
			<div>
				<h2>😎 My T0D0 🖋</h2>
				<div className={styles.newTodo}>
					<input
						name="newTodo"
						type="text"
						value={value}
						onChange={(event) => setValue(event.target.value)}
					/>
					{!showTimeSetting && (
						<button onClick={onAddClick}>➕</button>
					)}
					<button
						onClick={() => setShowTimeSetting(!showTimeSetting)}>
						{showTimeSetting ? "➖" : "⏰"}
					</button>
				</div>
			</div>

			{showTimeSetting && (
				<div className={styles.newTodo}>
					<input
						type="datetime-local"
						name="todoTiem"
						value={time.toString()}
						onChange={(event) =>
							setTime(new Date(event.target.value))
						}
					/>
					<button onClick={onAddWithTimeClick}>➕</button>
				</div>
			)}
			<ul className={styles.todoList}>
				{todos?.map((todo, index) => (
					<TodoItem
						key={`todoItem--${index}--${Math.random() * 1000}`}
						index={index}
						todo={todo}
						onCrossClick={onCrossClick}
					/>
				))}
			</ul>
			<Carousel />
		</div>
	);
}
