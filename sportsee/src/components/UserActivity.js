import React, { useState, useEffect } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ReferenceLine,
	Rectangle,
} from "recharts";
import { fetchUserActivity } from "../apiServices";

const UserActivity = ({ id }) => {
	const [activity, setActivity] = useState(null);

	useEffect(() => {
		const getUserActivity = async () => {
			console.log("Calling getUserActivity");
			if (typeof id !== "undefined") {
				try {
					const activityData = await fetchUserActivity(id);
					console.log("Fetched activity data:", activityData);
					setActivity(activityData.data);
				} catch (error) {
					console.error("Error in getUserActivity:", error);
				}
			}
		};

		getUserActivity();
	}, [id]); // Re-run if id changes

	if (!activity || !activity.sessions) {
		return <div>Loading...</div>;
	}
	console.log("Activity data:", activity);

	const dateDay = (date) => {
		const day = date.split("-")[2];
		return parseInt(day, 10); // Remove zero till 10
	};

	return (
		<div className="activitySection">
			<h2>Activité quotidienne</h2>
			<span className="activityHead">
				<p className="legendBlack">Poids (kg)</p>
				<p className="legendRed">Calories brûlées (kCal)</p>
			</span>
			<div className="barChart">
				<BarChart
					width={800}
					height={180}
					data={activity.sessions}
					margin={{ top: 10, right: 20, left: 20, bottom: 15 }}
					barGap={7}>
					<XAxis
						dataKey="day"
						tickFormatter={dateDay}
						axisLine={{ stroke: "#DEDEDE", strokeWidth: 1 }}
						tickLine={{ stroke: "#FFFFFF" }}
						tickMargin={20}
					/>
					<YAxis yAxisId="left" orientation="left" hide={true} />
					<YAxis
						yAxisId="right"
						orientation="right"
						domain={[65, 85]} // Start at 65 and end at 85
						ticks={[65, 75, 85]} // Show only these numbers
						axisLine={false}
						tickLine={false}
					/>
					<ReferenceLine
						yAxisId="right"
						y={75}
						stroke="#DEDEDE"
						strokeDasharray="3 3"
					/>
					<ReferenceLine
						yAxisId="right"
						y={85}
						stroke="#DEDEDE"
						strokeDasharray="3 3"
					/>

					<Tooltip />
					<Bar
						yAxisId="right"
						dataKey="kilogram"
						fill="#000000"
						name="Poids (kg)"
						barSize={7}
						radius={[3.5, 3.5, 0, 0]}
					/>
					<Bar
						yAxisId="left"
						dataKey="calories"
						fill="#E60000"
						name="Calories brûlées (kCal)"
						barSize={7}
						radius={[3.5, 3.5, 0, 0]}
					/>
					<Rectangle fill="#FBFBFB" x={750} y={50} width={100} height={145} />
				</BarChart>
			</div>
		</div>
	);
};

export default UserActivity;
