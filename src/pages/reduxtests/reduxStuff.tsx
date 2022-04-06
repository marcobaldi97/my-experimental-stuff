import { createStore } from "redux";

export type State = {
	count: number;
	values: Record<string, unknown>;
};

type ActionType = {
	type:
		| "INCREMENT"
		| "DECREMENT"
		| "ADD_VALUE"
		| "REMOVE_VALUE"
		| "SET_VALUE";
	payload: any;
};

export function incrementAction(multiplier: number = 1) {
	return {
		type: "INCREMENT",
		payload: {
			count: multiplier,
		},
	};
}

export function decrementAction(multiplier: number = 1) {
	return {
		type: "DECREMENT",
		payload: {
			count: multiplier,
		},
	};
}

const counterReducer = (
	state: State = { count: 0, values: {} },
	action: ActionType
): State => {
	switch (action.type) {
		case "INCREMENT":
			return {
				...state,
				count: state.count + action.payload.count,
			};
		case "DECREMENT":
			return {
				...state,
				count: state.count - action.payload.count,
			};
		case "ADD_VALUE":
			return {
				...state,
				values: {
					...state.values,
					[action.payload.key]: action.payload.value,
				},
			};
		case "REMOVE_VALUE":
			return {
				...state,
				values: {
					...state.values,
				},
			};
		case "SET_VALUE":
			return {
				...state,
				values: {
					...state.values,
					[action.payload.key]: action.payload.value,
				},
			};
		default:
			const newState: State = {
				count: 0,
				values: {},
			};

			return newState;
	}
};

export const store = createStore<State, ActionType, unknown, unknown>(
	counterReducer
);
