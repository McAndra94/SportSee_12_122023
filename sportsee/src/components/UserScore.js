import { PieChart, Pie, Cell } from "recharts";

const UserScore = ({ userData }) => {
	// Check both todayScore & score, if not null nor undefined
	// Then multiply by 100
	const score = (userData?.data?.todayScore || userData?.data?.score) * 100;
	console.log("score", score);
	const chartData = [
		{ name: "Score", value: score },
		{ name: "Remaining", value: 100 - score },
	];
	console.log("chartData", chartData);

	return (
		<div className="pieChartContainer">
			<div className="scoreTitle">Score</div>
			<div className="chartContainer">
				<PieChart width={200} height={200}>
					<Pie
						data={chartData}
						dataKey="value"
						cx="50%"
						cy="50%"
						innerRadius={80}
						outerRadius={89.69}
						startAngle={90}
						endAngle={450}
						cornerRadius={25}>
						{/* Score color */}
						<Cell key={`cell-0`} fill="#ff0000" radius={10} />
						{/* Remaining color*/}
						<Cell key={`cell-1`} fill="#FBFBFB" />
					</Pie>
				</PieChart>
				<div className="scoreBox">
					<p className="scoreClass">{`${score}%`}</p>
					<p className="scoreTxt">de votre objectif</p>
				</div>
			</div>
		</div>
	);
};

export default UserScore;
