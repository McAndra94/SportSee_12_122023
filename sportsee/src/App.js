import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import User from "./components/User";
import "./styles/NavBar.css";
import "./styles/User.css";

function App() {
	const { id } = useParams();
	console.log("Captured ID in App:", id);
	return (
		<>
			<NavBar />
			<User id={id} />
		</>
	);
}

export default App;
