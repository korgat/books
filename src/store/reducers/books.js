
const initiateState = {
	books: []
}

const books = (state = initiateState, action) => {
	switch (action.type) {
		case "SET_ALL_BOOKS":
			return {
				books: action.payload
			}
		default:
			return state
	}
}

export default books