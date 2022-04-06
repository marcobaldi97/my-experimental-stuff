import { type } from "os";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementAction, incrementAction, State } from "./reduxStuff";

import styles from "./reduxtest.module.scss";

const ReduxTestInput: React.FC<{ id: string }> = (props) => {
	const { id } = props;

	const dispatch = useDispatch();
	const value = useSelector((state: State) => state.values.id);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: "SET_VALUE",
			payload: {
				key: id,
				value: event.target.value,
			},
		});
	};

	return (
		<div
			style={{
				display: "grid",
				gap: "20px",
				padding: "12px",
				margin: "5px",
				border: "1px solid #ccc",
				borderRadius: "5px",
			}}>
			<label htmlFor="textValue">{id}</label>
			<input
				type="text"
				name="textValue"
				id={`textValue--${id}`}
				onChange={handleChange}
				value={value as string}
			/>
		</div>
	);
};

const ReduxTest: React.FC = () => {
	const dispatch = useDispatch();
	const [multiplier, setMultiplier] = useState(1);

	function increment() {
		dispatch(incrementAction(multiplier));
	}

	function decrement() {
		dispatch(decrementAction(multiplier));
	}

	function handleMultiplierChange(
		event: React.ChangeEvent<HTMLInputElement>
	) {
		if (multiplier > 0) setMultiplier(parseInt(event.target.value));
		else setMultiplier(1);
	}

	const count = useSelector((state: State) => state.count);
	const values = useSelector((state: State) => state.values);

	const forms = [];

	for (let index = 0; index <= count; index++) {
		forms.push(<ReduxTestInput key={index} id={`${index}`} />);
	}

	return (
		<div className={styles.container}>
			<h1>Redux limit tests</h1>

			<label htmlFor="multiplier">Multiplier: </label>
			<input
				type="number"
				name="multiplier"
				id="multiplierId"
				value={multiplier}
				onChange={handleMultiplierChange}
			/>

			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
			<h1>Forms: {count}</h1>
			<div className={styles.body}>
				<div className={styles.form}>{forms.map((form) => form)}</div>
				<div className={styles.values}>
					<table>
						<tbody>
							<tr>
								<th>Key</th>
								<th>Value</th>
							</tr>
							{Object.entries(values).map(([key, value]) => (
								<tr key={key}>
									<td>{key}</td>
									<td>{value as string}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ReduxTest;
