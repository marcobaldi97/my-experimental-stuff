import React, { useCallback, useEffect, useReducer, useState } from "react";
import Carousel from "./components/carousel/carousel";
import TodoItem from "./components/todoitem/todoitem";

import styles from "./todopanel.module.scss";

type Todos = string[];

type TodosAction = {
	type: any;
	payload: {
		value: string;
		index: number;
	};
};

export default function TodoPanel() {
	const [value, setValue] = useState("");
	const [showTimeSetting, setShowTimeSetting] = useState(false);
	const [time, setTime] = useState(new Date());

	const todosReducer = (state: Todos, action: TodosAction): string[] => {
		switch (action.type) {
			case "add":
				return [...state, action.payload.value];
			case "remove":
				return state.filter(
					(_, index) => index !== action.payload.index
				);
			case "clear":
				return [];
			default:
				return state;
		}
	};

	const initialState = ["Learn ReactJS", "Going to Party"];

	const [todos, dispatch] = useReducer(todosReducer, initialState);

	//clean up
	useEffect(() => {
		const timeOuts: number[] = [];
		return timeOuts.forEach((timeout) => window.clearTimeout(timeout));
	}, []);

	const onCrossClick = useCallback(
		(index: number) => {
			dispatch({
				type: "remove",
				payload: {
					value: "",
					index,
				},
			});
		},
		[todos]
	);

	const onAddClick = useCallback(() => {
		if (value) {
			dispatch({
				type: "add",
				payload: {
					value,
					index: todos.length,
				},
			});
			setValue("");
		}
	}, [todos.length, value]);

	const onAddWithTimeClick = useCallback(() => {
		if (value.trim() === "") return;

		window.setTimeout(() => {
			dispatch({
				type: "add",
				payload: {
					value,
					index: todos.length,
				},
			});
			setValue("");
		}, time.getTime() - new Date().getTime());
	}, [value, time, todos.length]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
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

				{showTimeSetting && (
					<div className={styles.newTodo}>
						<input
							type="datetime-local"
							name="todoTime"
							value={time.toString()}
							onChange={(event) =>
								setTime(new Date(event.target.value))
							}
						/>
						<button onClick={onAddWithTimeClick}>➕</button>
					</div>
				)}
			</div>

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
