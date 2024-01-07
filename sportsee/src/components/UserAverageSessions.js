import React, { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { fetchUserAverageSessions } from "../apiServices";

const UserAverageSessions = ({ id }) => {
	const [averageSessions, setAverageSessions] = useState(null);
	const [isHovered, setIsHovered] = useState(false);

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
		console.log("averageSessions data set:", averageSessions);
	}, [id]); // Re-run if id changes

	console.log("Render with averageSessions:", averageSessions);
	if (!averageSessions) {
		return <div>Loading...</div>;
	}

	const handleMouseMove = (event) => {
		if (event.isTooltipActive) {
			let chartBox = document.querySelector(".chartContainer");
			let boxWidth = chartBox.clientWidth;
			let mouseLocation = Math.round(
				(event.activeCoordinate.x / boxWidth) * 100
			);

			chartBox.style.background = `linear-gradient(90deg, rgba(255,0,0,1) ${mouseLocation}%, rgba(220,0,0,1.2) ${mouseLocation}%, rgba(220,0,0,1.2) 100%)`;
		}
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		let chartBox = document.querySelector(".chartContainer");
		chartBox.style.background = "none";
		setIsHovered(false);
	};

	const handleTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className="tooltipBox">
					<p>{`${payload[0].value} min`}</p>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="chartContainer">
			<ResponsiveContainer>
				<h3 className="avgTitle">Durée moyenne des sessions</h3>
				<LineChart
					width={258}
					height={265}
					data={averageSessions}
					margin={{ top: 0, right: 10, bottom: 120, left: 10 }}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}>
					<defs>
						<linearGradient id="lineGradient" x1="1" y1="0" x2="0" y2="0">
							<stop offset="20%" stopColor="#FFFFFF" stopOpacity={0.8} />
							<stop offset="60%" stopColor="#FFFFFF" stopOpacity={0.6} />
							<stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.4} />
						</linearGradient>
					</defs>
					<XAxis
						dataKey="day"
						axisLine={false}
						tickLine={false}
						tick={{ fontSize: 12, fontWeight: 500, fill: "#FFFFFF80", dy: 15 }}
						padding={{ right: 10, left: 10 }}
					/>
					<YAxis dataKey="sessionLength" domain={[0, 65]} hide={true} />
					<Tooltip content={handleTooltip} cursor={false} />
					<Line
						type="monotone"
						dataKey="sessionLength"
						stroke={`url(#lineGradient)`}
						strokeWidth={2.5}
						dot={false}
						activeDot={{
							fill: "#FFFFFF",
							r: 4,
							stroke: "#FFFFFF25",
							strokeWidth: 12,
						}}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default UserAverageSessions;
