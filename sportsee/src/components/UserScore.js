const UserScore = ({ userData }) => {
	// Check both todayScore & score, if not null nor undefined
	const score = userData?.data?.todayScore || userData?.data?.score;

	return (
		<div>
			<div>Score</div>
			<div>
				<p>{`${score}%`}</p>
				<p>de votre objectif</p>
			</div>
		</div>
	);
};

export default UserScore;
