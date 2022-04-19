import React from "react";
import TodoPanel from "./pages/todo/todopanel";

import styles from "./App.module.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ReduxTest from "./pages/reduxtests/reduxtest";
import { Provider } from "react-redux";
import { store } from "./pages/reduxtests/reduxStuff";
import GraphTest from "./pages/graph/GraphTest";

function App() {
	return (
		<Provider store={store}>
			<div className={styles.App}>
				<BrowserRouter>
					<Routes>
						<Route path="/todo" element={<TodoPanel />} />
						<Route path="/testRedux" element={<ReduxTest />} />
						<Route path="/jsonToGraph" element={<GraphTest />} />
						<Route
							path="*"
							element={<Navigate to="/jsonToGraph" />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</Provider>
	);
}

export default App;
