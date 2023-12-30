const fetchUserData = async (id) => {
	try {
		const userDataResponse = await fetch(`/user/${id}`);
		if (!userDataResponse.ok) {
			throw new Error(
				`Failed to fetch user data. Status: ${userDataResponse.status}`
			);
		}
		return userDataResponse.json();
	} catch (error) {
		console.error("Error fetching user data:", error);
		throw error;
	}
};

const fetchUserActivity = async (id) => {
	try {
		const userActivityResponse = await fetch(`/user/${id}/activity`);
		if (!userActivityResponse.ok) {
			throw new Error(
				`Failed to fetch user activity. Status: ${userActivityResponse.status}`
			);
		}
		return userActivityResponse.json();
	} catch (error) {
		console.error("Error fetching user activity:", error);
		throw error;
	}
};

const fetchUserAverageSessions = async (id) => {
	try {
		const userAverageSessionsResponse = await fetch(
			`/user/${id}/average-sessions`
		);
		if (!userAverageSessionsResponse.ok) {
			throw new Error(
				`Failed to fetch user average sessions. Status: ${userAverageSessionsResponse.status}`
			);
		}
		return userAverageSessionsResponse.json();
	} catch (error) {
		console.error("Error fetching user average sessions:", error);
		throw error;
	}
};

const fetchUserPerformance = async (id) => {
	try {
		const userPerformanceResponse = await fetch(`/user/${id}/performance`);
		if (!userPerformanceResponse.ok) {
			throw new Error(
				`Failed to fetch user performance. Status: ${userPerformanceResponse.status}`
			);
		}
		return userPerformanceResponse.json();
	} catch (error) {
		console.error("Error fetching user performance:", error);
		throw error;
	}
};

export {
	fetchUserData,
	fetchUserActivity,
	fetchUserAverageSessions,
	fetchUserPerformance,
};
