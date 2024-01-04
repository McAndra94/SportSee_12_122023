import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import User from "./components/User";
//import User from "./components/UserActivity";
import "./styles/NavBar.css";
import "./styles/User.css";

function App() {
	return (
		<>
			<NavBar />
			<Routes>
				<Route path="/user/:id" element={<User />} />
				{/* 				<Route path="/user/:id/activity" element={<UserActivity />} />
				 */}
			</Routes>
		</>
	);
}

export default App;
