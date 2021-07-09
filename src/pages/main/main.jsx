import React, { useState } from 'react'
import ItemBlock from '../../components/itemBlock';
import MenuComponent from '../../components/menu';
import { Card } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { addBookToMyLibrary } from "../../store/actions/setLibrary"
import firebase from "../../firebase"


const Main = ({ books, booksInLibrary, sortDirection, user }) => {
	const dispatch = useDispatch()
	const [searchString, setSearchString] = useState("")

	const addBook = (obj) => {
		dispatch(addBookToMyLibrary(obj, user))
	}

	const deleteBook = (id) => {
		firebase.firestore()
			.collection("allBooks")
			.doc(id)
			.delete()
	}

	const sortBy = () => {
		return books.filter((obj) => {
			return obj.title.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
		})
	}

	return (
		<div>
			<MenuComponent setSearchString={setSearchString} searchString={searchString} sortDirection={sortDirection} />
			<Card.Group itemsPerRow={3}>
				{sortBy().map((obj, i) => <ItemBlock
					user={user}
					{...obj}
					booksInLibrary={booksInLibrary}
					addBook={addBook}
					deleteBook={deleteBook}
					key={obj.title + i} />)}
			</Card.Group>
		</div>
	)
}

export default Main
