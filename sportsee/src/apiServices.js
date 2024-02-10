import {
	userIdAdapter,
	avgSessionsAdapter,
	performanceAdapter,
} from "./dataAdapter";

const API_BASE_URL = "http://localhost:3001";

const fetchUserData = async (id) => {
	try {
		const userDataResponse = await fetch(`${API_BASE_URL}/user/${id}`);
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
		const url = `${API_BASE_URL}/user/${id}/activity`;
		console.log("Fetching user activity from:", url);

		const userActivityResponse = await fetch(url);
		if (!userActivityResponse.ok) {
			throw new Error(
				`Failed to fetch user activity. Status: ${userActivityResponse.status}`
			);
		}

		const userActivityData = await userActivityResponse.json();
		// Apply adapter to fetched activity data
		const userIdData = userIdAdapter([userActivityData]);
		return userIdData[0];
	} catch (error) {
		console.error("Error fetching user activity:", error);
		throw error;
	}
};

const fetchUserAverageSessions = async (id) => {
	try {
		const userAverageSessionsResponse = await fetch(
			`${API_BASE_URL}/user/${id}/average-sessions`
		);
		if (!userAverageSessionsResponse.ok) {
			throw new Error(
				`Failed to fetch user average sessions. Status: ${userAverageSessionsResponse.status}`
			);
		}

		// Fetch data, then apply the adapter to the fetched data
		const userAverageSessionsData = await userAverageSessionsResponse.json();
		const avgSessionsData = avgSessionsAdapter([userAverageSessionsData]);
		return avgSessionsData;
	} catch (error) {
		console.error("Error fetching user average sessions:", error);
		throw error;
	}
};

const fetchUserPerformance = async (id) => {
	try {
		const userPerformanceResponse = await fetch(
			`${API_BASE_URL}/user/${id}/performance`
		);
		if (!userPerformanceResponse.ok) {
			throw new Error(
				`Failed to fetch user performance. Status: ${userPerformanceResponse.status}`
			);
		}

		const userPerformanceData = await userPerformanceResponse.json();
		const performanceData = performanceAdapter([userPerformanceData]);
		console.log("Perform data: ", performanceData);
		return performanceData[0];
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
