const UserWelcome = ({ userData }) => {
	// Check if not null nor undefined
	const firstName = userData?.data?.userInfos?.firstName;
	//const lastName = userData?.data?.userInfos?.lastName;

	return (
		<div>
			<div className="welcomeSection">
				<h1>
					<span>Bonjour </span>
					<span className="firstName">{firstName}</span>
				</h1>
				<p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
			</div>
		</div>
	);
};

export default UserWelcome;
