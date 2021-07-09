import React from 'react'
import { Card, Button } from 'semantic-ui-react'

const ItemBlock = ({ title, image, author, description, rating, id, user, booksInLibrary, addBook, deleteBook }) => {

	const onAddClick = () => {
		const obj = { title, image, author, description, rating, id, bookInProgress: true }
		addBook(obj)
	}
	const onDeleteClick = () => {
		deleteBook(id)
	}

	return (
		<Card
			image={image}
			header={title}
			meta={author}
			description={<div>
				{description}
				<div className="btnBlock">
					{!booksInLibrary.includes(id) && user && <div>
						<Button onClick={onAddClick} compact color="green" size='mini'>ADD</Button>
					</div>}
					{user && user.email === "admin@gmail.com" && <div>
						<Button onClick={onDeleteClick} compact color="red" size='mini'>Delete</Button>
					</div>}
				</div>
			</div >}
		/>
	)
}

export default ItemBlock
