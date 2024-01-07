/* import { BrowserRouter as Router, Route, Switch } from "react-router-dom";*/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
	// Retrieve id from URL
	const { id } = useParams();
	console.log("Captured ID in User:", id);

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
				console.log("User Data:", userData);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchData();
	}, [id]);

	return (
		<div className="mainFrame">
			<UserWelcome userData={userData} />
			<div className="contentSections">
				<div className="mainComponents">
					<div className="activityComponent ">
						<UserActivity id={id} />
					</div>
					<div className="rowComponents">
						<div className="averageSessionsComponent  ">
							<UserAverageSessions id={id} />
						</div>
						<div className="performanceComponent">
							<UserPerformance userPerformance={userPerformance} />
						</div>
						<div className="scoreComponent ">
							<UserScore userData={userData} />
						</div>
					</div>
				</div>
				<div className="trackComponent">
					<UserTrack userData={userData} />
				</div>
			</div>
		</div>
	);
};

export default User;
