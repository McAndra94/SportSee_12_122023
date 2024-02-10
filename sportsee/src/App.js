import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import User from "./components/User";
import "./styles/NavBar.css";
import "./styles/User.css";

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/user/:id" element={<User />} />
			</Routes>
		</>
	);
}

export default App;
