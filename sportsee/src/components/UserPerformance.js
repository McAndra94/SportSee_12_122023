import React, { useState, useEffect } from "react";
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
} from "recharts";
import { fetchUserPerformance } from "../apiServices";

const UserPerformance = ({ id }) => {
	const [performance, setPerformance] = useState(null);

	useEffect(() => {
		const getUserPerformance = async () => {
			console.log("Before calling fetchUserPerformance for ID:", id);
			if (typeof id !== "undefined") {
				try {
					const performanceData = await fetchUserPerformance(id);
					setPerformance(performanceData);
				} catch (error) {
					console.error("Error in getUserPerformance:", error);
				}
			}
		};

		getUserPerformance();
	}, [id]); // Re-run if id changes

	console.log("Render with performance data:", performance);
	if (
		!performance ||
		!performance.performances ||
		performance.performances.length === 0
	) {
		return <p>No user performance data available.</p>;
	}

	const kindMapping = {
		cardio: "Cardio",
		energy: "Energie",
		endurance: "Endurance",
		strength: "Force",
		speed: "Vitesse",
		intensity: "Intensité",
	};

	const radarData = performance.performances
		.map((item) => ({
			...item,
			kind: kindMapping[item.kind],
			value: item.value,
		}))
		.sort((a, b) => {
			const order = [
				"Intensité",
				"Vitesse",
				"Force",
				"Endurance",
				"Energie",
				"Cardio",
			];
			return order.indexOf(a.kind) - order.indexOf(b.kind);
		});

	return (
		<div>
			<RadarChart
				innerRadius={10}
				outerRadius={80}
				width={258}
				height={263}
				data={radarData}>
				<PolarGrid />
				<PolarAngleAxis
					dataKey="kind"
					tick={{ fontSize: 12, fontWeight: 500, fill: "#FFFFFF", dy: 4 }}
				/>
				<PolarRadiusAxis
					domain={[0, 240]}
					tick={false}
					axisLine={{ stroke: "transparent" }}
				/>
				<Radar
					name="Performance"
					dataKey="value"
					fill="#FF0101"
					fillOpacity={0.7}
				/>
			</RadarChart>
		</div>
	);
};

export default UserPerformance;
