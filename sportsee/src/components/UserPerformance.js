import {
	//Radar,
	RadarChart,
	/* PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis, */
} from "recharts";

const UserPerformance = ({ userPerformance }) => {
	if (
		!userPerformance ||
		userPerformance.data === null ||
		userPerformance.data === undefined
	) {
		console.log("userPerformance:", userPerformance);
		return <p>No user performance data available.</p>;
	}
	const performanceData = Array.isArray(userPerformance.data)
		? userPerformance.data
		: [];

	const intensiteValue = performanceData.find((item) => item.kind === 6)?.value;
	const vitesseValue = performanceData.find((item) => item.kind === 5)?.value;
	const forceValue = performanceData.find((item) => item.kind === 4)?.value;
	const enduranceValue = performanceData.find((item) => item.kind === 3)?.value;
	const energieValue = performanceData.find((item) => item.kind === 2)?.value;
	const cardioValue = performanceData.find((item) => item.kind === 1)?.value;

	return (
		<div>
			<RadarChart></RadarChart>
			<div>
				<div>
					<p>Intensité</p>
					<p>{intensiteValue}</p>
				</div>
				<div>
					<p>Vitesse</p>
					<p>{vitesseValue}</p>
				</div>
				<div>
					<p>Force</p>
					<p>{forceValue}</p>
				</div>
				<div>
					<p>Endurance</p>
					<p>{enduranceValue}</p>
				</div>
				<div>
					<p>Energie</p>
					<p>{energieValue}</p>
				</div>
				<div>
					<p>Cardio</p>
					<p>{cardioValue}</p>
				</div>
			</div>{" "}
		</div>
	);
};

export default UserPerformance;
