/* import { BrowserRouter as Router, Route, Switch } from "react-router-dom";*/
// import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UserWelcome from "./UserWelcome";
import UserActivity from "./UserActivity";
import UserTrack from "./UserTrack";
import UserScore from "./UserScore";
import UserAverageSessions from "./UserAverageSessions";
import UserPerformance from "./UserPerformance";

import {
	fetchUserData,
	fetchUserActivity,
	fetchUserAverageSessions,
	fetchUserPerformance,
} from "../apiServices";

const User = () => {
	const pathname = window.location.pathname;
	// Retrieve id from url
	const id = pathname.split("/").pop();

	const [userData, setUserData] = useState(null);
	const [userActivity, setUserActivity] = useState(null);
	const [userAverageSessions, setUserAverageSessions] = useState(null);
	const [userPerformance, setUserPerformance] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Check if id is defined
				if (!id) {
					return;
				}

				const [userData, userActivity, userAverageSessions, userPerformance] =
					await Promise.all([
						fetchUserData(id),
						fetchUserActivity(id),
						fetchUserAverageSessions(id),
						fetchUserPerformance(id),
					]);

				setUserData(userData);
				setUserActivity(userActivity);
				setUserAverageSessions(userAverageSessions);
				setUserPerformance(userPerformance);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchData();
	}, [id]);

	console.log("User Data:", userData);

	return (
		<div className="mainFrame">
			<UserWelcome userData={userData} />
			<div className="contentSections">
				<UserActivity userActivity={userActivity} />
				<UserTrack userData={userData} />
				<UserScore userData={userData} />
				<UserAverageSessions userAverageSessions={userAverageSessions} />
				<UserPerformance userPerformance={userPerformance} />
			</div>
		</div>
	);
};

export default User;
