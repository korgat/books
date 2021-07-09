import firebase from "../../firebase"

export const clearMyLibrary = () => ({
	type: "CLEAR_MY_LIBRARY"
})
export const addBookToLibrary = (obj) => ({
	type: "ADD_TO_LIBRARY",
	payload: obj
})

export const addMyDescription = (obj) => ({
	type: "ADD_MY_DESCRIPTION",
	payload: obj
})

export const setMyRating = (obj) => ({
	type: "SET_MY_RATING",
	payload: obj
})

export const setMyLibrary = (obj) => ({
	type: "SET_MY_LIBRARY",
	payload: obj
})

export const setBookStatus = (obj) => ({
	type: "SET_BOOK_STATUS",
	payload: obj
})

export const deleteBook = (id) => ({
	type: "DELETE_BOOK",
	payload: id
})


export const addBookToMyLibrary = (obj) => (dispatch, getState) => {
	dispatch(addBookToLibrary(obj))
	const myBooks = getState().myLibrary
	const user = getState().login.user
	firebase.firestore()
		.collection("UsersLibrary")
		.doc(user.uid)
		.update({
			books: myBooks.books,
			booksIds: myBooks.booksIds
		})
}

export const addDescriptionToMyLibrary = (obj) => (dispatch, getState) => {
	dispatch(addMyDescription(obj))
	const myBooks = getState().myLibrary
	const user = getState().login.user
	firebase.firestore()
		.collection("UsersLibrary")
		.doc(user.uid)
		.update({
			books: myBooks.books
		})
}

export const addRatingToMyLibrary = (obj) => (dispatch, getState) => {
	dispatch(setMyRating(obj))
	const myBooks = getState().myLibrary
	const user = getState().login.user
	firebase.firestore()
		.collection("UsersLibrary")
		.doc(user.uid)
		.update({
			books: myBooks.books
		})
}

export const changeBookStatus = (obj) => (dispatch, getState) => {
	dispatch(setBookStatus(obj))
	const myBooks = getState().myLibrary
	const user = getState().login.user
	firebase.firestore()
		.collection("UsersLibrary")
		.doc(user.uid)
		.update({
			books: myBooks.books
		})
}

export const deleteBookFromMyLibrary = (id) => (dispatch, getState) => {
	dispatch(deleteBook(id))
	const myBooks = getState().myLibrary
	const user = getState().login.user
	firebase.firestore()
		.collection("UsersLibrary")
		.doc(user.uid)
		.update({
			books: myBooks.books,
			booksIds: myBooks.booksIds
		})
}
