import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import TapRouter from "./router/router";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
	render() {
		return (
			<>
				<TapRouter />
				<ToastContainer
					theme='colored'
				/>
			</>
		);
	}
}

export default App;