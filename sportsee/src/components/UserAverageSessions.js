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
		// const mockData = [{ day: "L", sessionLength: 30 }];
		const getUserAverageSessions = async () => {
			if (typeof id !== "undefined") {
				try {
					const averageSessionsData = await fetchUserAverageSessions(id);
					console.log("Fetched averageSessionsData: ", averageSessionsData);

					setAverageSessions(averageSessionsData);
					if (averageSessionsData && averageSessionsData.length > 0) {
						let dayMapping = ["L", "M", "M", "J", "V", "S", "D"];
						let dayData = averageSessionsData[0].data.sessions.map(
							(session) => ({
								...session,
								day: dayMapping[session.day - 1], // Convert numbers to letters
							})
						);

						// Add empty days at the start & end for continued line
						const startEmptyDay = { day: "", sessionLength: "0" };
						const endEmptyDay = { day: "", sessionLength: "65" };

						dayData = [startEmptyDay, ...dayData, endEmptyDay];

						setAverageSessions(dayData);
						console.log("Fetched dayData: ", dayData);
					}
				} catch (error) {
					console.error("Error in getUserAverageSessions:", error);
				}
			}
		};

		getUserAverageSessions();
		console.log("averageSessions data set:", averageSessions);
	}, [id]); // Re-run if id changes

	useEffect(() => {}, [averageSessions]);

	if (!averageSessions) {
		return <div>Loading...</div>;
	}

	const handleMouseMove = (event) => {
		if (event.isTooltipActive) {
			let chartBox = document.querySelector(".avgChartContainer");
			let boxWidth = chartBox.clientWidth;
			let mouseLocation = Math.round(
				(event.activeCoordinate.x / boxWidth) * 100
			);

			chartBox.style.background = `linear-gradient(90deg, rgba(255,0,0,1) ${mouseLocation}%, rgba(220,0,0,1.2) ${mouseLocation}%, rgba(220,0,0,1.2) 100%)`;
		}
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		let chartBox = document.querySelector(".avgChartContainer");
		chartBox.style.background = "none";
		setIsHovered(false);
	};

	const handleTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			const currentIndex = averageSessions.findIndex(
				(session) => session.day === label
			);

			// Don't render tooltip for 1st & last (empty days)
			if (currentIndex === 0 || currentIndex === averageSessions.length - 1) {
				return null;
			}

			return (
				<div className="tooltipBox">
					<p>{`${payload[0].value} min`}</p>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="avgChartContainer">
			<ResponsiveContainer>
				<h3 className="avgTitle">Durée moyenne des sessions</h3>
				<LineChart
					data={averageSessions}
					margin={{ bottom: 120 }}
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
