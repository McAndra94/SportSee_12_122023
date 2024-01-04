import React, { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from "recharts";
import { fetchUserAverageSessions } from "../apiServices";

const UserAverageSessions = ({ id }) => {
	const [averageSessions, setAverageSessions] = useState(null);
	const [hoverIndex, setHoverIndex] = useState(-1);

	useEffect(() => {
		const getUserAverageSessions = async () => {
			if (typeof id !== "undefined") {
				try {
					const averageSessionsData = await fetchUserAverageSessions(id);
					console.log("Fetched averageSessionsData: ", averageSessionsData);

					setAverageSessions(averageSessionsData.data);

					const dayMapping = ["L", "M", "M", "J", "V", "S", "D"];
					const dayData = averageSessionsData.data.sessions.map((session) => ({
						...session,
						day: dayMapping[session.day - 1], // Convert numbers to letters
					}));
					setAverageSessions(dayData);
					console.log("Fetched dayData: ", dayData);
				} catch (error) {
					console.error("Error in getUserAverageSessions:", error);
				}
			}
		};

		getUserAverageSessions();
	}, [id]); // Re-run if id changes

	if (!averageSessions) {
		return <div>Loading...</div>;
	}

	const handleMouseHover = (data, index) => {
		setHoverIndex(index);
	};

	return (
		<div>
			{hoverIndex >= 0 && (
				<div
					style={{
						top: 0,
						bottom: 0,
						right: 0,
						backgroundColor: "rgba(0, 0, 0, 0.2)", // Dark overlay
					}}
				/>
			)}
			<p className="avgTitle">Durée moyenne des sessions</p>
			<LineChart
				width={258}
				height={265}
				data={averageSessions}
				margin={{ bottom: 120, right: 10, left: 10 }}>
				<defs>
					<linearGradient x1="0" y1="0" x2="0" y2="0"></linearGradient>
				</defs>
				<XAxis
					dataKey="day"
					axisLine={false}
					tickLine={false}
					tick={{ fontSize: 12, fill: "#FFFFFF", dy: 10 }}
					padding={{ top: 10, right: 10, left: 10 }}
				/>
				<YAxis domain={[0, 65]} hide={true} />
				<Tooltip />
				<Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" />
			</LineChart>
		</div>
	);
};

export default UserAverageSessions;
