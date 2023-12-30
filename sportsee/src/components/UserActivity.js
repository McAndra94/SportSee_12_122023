const UserActivity = ({ userData }) => {
	//	console.log("userActivity:", userActivity);
	return (
		<div>
			<div className="activitySection">
				<h2>Activité quotidienne</h2>
				<span className="activityHead">
					<p>Poids (kg)</p>
					<p>Calories brûlées (kCal)</p>
				</span>
			</div>
		</div>
	);
};

export default UserActivity;
