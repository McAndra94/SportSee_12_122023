function userIdAdapter(userData) {
	return userData.map((user) => ({
		...user,
		userId: user.userId || user.id,
		id: user.id || user.userId,
	}));
}

function avgSessionsAdapter(userData) {
	console.log("Fetched sessions userData: ", userData);

	return userData.map((user) => ({
		...user,
		sessions: user.data.sessions.map((session, index, sessions) => ({
			...session,
			sessionLength: session.sessionLength,
			// Add values to Line, both start & end
			value:
				index === 0 ? sessions[0].value : sessions[sessions.length - 1].value,
		})),
	}));
}

function performanceAdapter(userData) {
	console.log("Fetched performance userData: ", userData);

	return userData.map((userPerformance) => {
		const performances = userPerformance.data.data.map((performance) => {
			return {
				kind: userPerformance.data.kind[performance.kind],
				value: performance.value,
			};
		});

		return {
			userId: userPerformance.data.userId,
			performances,
		};
	});
}

module.exports = {
	userIdAdapter,
	avgSessionsAdapter,
	performanceAdapter,
};
