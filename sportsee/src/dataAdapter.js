function normalizeUserId(userData) {
	return userData.map((user) => ({
		...user,
		userId: user.userId || user.id,
		id: user.id || user.userId,
	}));
}

module.exports = {
	normalizeUserId,
};
