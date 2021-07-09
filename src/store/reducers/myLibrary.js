const initiateState = {
	booksIds: [],
	books: []
}


const myLibrary = (state = initiateState, action) => {
	switch (action.type) {
		case "ADD_TO_LIBRARY":
			return {
				booksIds: [...state.booksIds, action.payload.id],
				books: [...state.books, action.payload]
			}
		case "CLEAR_MY_LIBRARY":
			return {
				booksIds: [],
				books: []
			}
		case "ADD_MY_DESCRIPTION":
			return {
				...state,
				books: [...state.books.map((obj) => {
					if (obj.id === action.payload.id) {
						return { ...obj, myDescription: action.payload.text }
					} else {
						return obj
					}
				})]
			}
		case "SET_MY_RATING":
			return {
				...state,
				books: [...state.books.map((obj) => {
					if (obj.id === action.payload.id) {
						return { ...obj, rating: action.payload.rating }
					} else {
						return obj
					}
				})]
			}
		case "SET_BOOK_STATUS":
			return {
				...state,
				books: [...state.books.map((obj) => {
					if (obj.id === action.payload.id) {
						return { ...obj, bookInProgress: action.payload.bookInProgress }
					} else {
						return obj
					}
				})]
			}
		case "DELETE_BOOK":
			return {
				...state,
				booksIds: [...state.booksIds.filter((existId) => existId !== action.payload)],
				books: [...state.books.filter((obj) => obj.id !== action.payload)]
			}
		case "SET_MY_LIBRARY":
			return {
				...state,
				books: action.payload.books,
				booksIds: action.payload.booksIds
			}
		default:
			return state
	}
}

export default myLibrary