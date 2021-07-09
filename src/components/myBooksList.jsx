import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Table, Checkbox } from 'semantic-ui-react'
import { addDescriptionToMyLibrary, addRatingToMyLibrary, changeBookStatus, deleteBookFromMyLibrary } from '../store/actions/setLibrary'
import MyLibraryItem from './myLibraryItem'
import orderBy from "lodash/orderBy"

const MyBooksList = ({ chosenBooks, sortType, sortDirection, searchString }) => {
	const dispatch = useDispatch()
	const [hideFinished, setHideFinished] = useState(true)

	const addDescription = (obj) => {
		dispatch(addDescriptionToMyLibrary(obj))
	}
	const setRating = (obj) => {
		dispatch(addRatingToMyLibrary(obj))
	}
	const handleBookStatus = (obj) => {
		dispatch(changeBookStatus(obj))
	}
	const deleteBook = (id) => {
		dispatch(deleteBookFromMyLibrary(id))
	}
	const onHideBtnClick = () => {
		setHideFinished(!hideFinished)
	}

	const sortBy = () => {
		return orderBy(chosenBooks, sortType, sortDirection).filter((obj) => {
			return obj.title.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
		})
	}

	return (
		<Table celled padded>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell singleLine>Cover</Table.HeaderCell>
					<Table.HeaderCell>Title</Table.HeaderCell>
					<Table.HeaderCell>Rating</Table.HeaderCell>
					<Table.HeaderCell>Status
						<div><Checkbox slider onClick={onHideBtnClick} label={{ children: 'Show finished' }} /></div>
					</Table.HeaderCell>
					<Table.HeaderCell>My opinion</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{sortBy().map((obj, i) => {
					if (hideFinished) {
						if (obj.bookInProgress) {
							return <MyLibraryItem key={obj.title + i}
								{...obj}
								deleteBook={deleteBook}
								handleBookStatus={handleBookStatus}
								addDescription={addDescription}
								setRating={setRating}
							/>
						}
					} else {
						return <MyLibraryItem key={obj.title + i}
							{...obj}
							deleteBook={deleteBook}
							handleBookStatus={handleBookStatus}
							addDescription={addDescription}
							setRating={setRating}
						/>
					}
				})}
			</Table.Body>
		</Table>
	)
}

export default MyBooksList
