import React from "react";
import TodoPanel from "./pages/todo/todopanel";

import styles from "./App.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReduxTest from "./pages/reduxtests/reduxtest";
import { Provider } from "react-redux";
import { store } from "./pages/reduxtests/reduxStuff";

function App() {
	return (
		<Provider store={store}>
			<div className={styles.App}>
				<BrowserRouter>
					<Routes>
						<Route path="/test" element={<ReduxTest />} />
						<Route path="/" element={<TodoPanel />} />
					</Routes>
				</BrowserRouter>
			</div>
		</Provider>
	);
}

export default App;
