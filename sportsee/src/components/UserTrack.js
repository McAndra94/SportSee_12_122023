const UserTrack = ({ userData }) => {
	// Check if not null nor undefined
	const calorieCount = userData?.data?.keyData?.calorieCount;
	const proteinCount = userData?.data?.keyData?.proteinCount;
	const carbohydrateCount = userData?.data?.keyData?.carbohydrateCount;
	const lipidCount = userData?.data?.keyData?.lipidCount;

	return (
		<aside className="trackSection">
			<div>
				<p>{`${calorieCount}kCal`}</p>
				<p>Calories</p>
			</div>
			<div>
				<p>{`${proteinCount}g`}</p>
				<p>Proteines</p>
			</div>
			<div>
				<p>{`${carbohydrateCount}g`}</p>
				<p>Glucides</p>
			</div>
			<div>
				<p>{`${lipidCount}g`}</p>
				<p>Lipides</p>
			</div>
		</aside>
	);
};

export default UserTrack;
