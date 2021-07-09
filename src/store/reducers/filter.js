
const initiateState = {
	sortType: "title",
	sortDirection: "asc"
}

const filter = (state = initiateState, action) => {
	switch (action.type) {
		case "SET_SORT_TYPE":
			return {
				...state,
				sortType: action.payload
			}
		case "SET_SORT_DIRECTION":
			return {
				...state,
				sortDirection: action.payload
			}
		default:
			return state
	}
}

export default filter