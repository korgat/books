import React, { useState } from 'react'
import { Header, Table, Rating, Button } from 'semantic-ui-react'

const MyLibraryItem = (props) => {
	const {
		title, image, rating, id, myDescription = "leave your comment", bookInProgress = true, addDescription, setRating, handleBookStatus, deleteBook
	} = props
	const [bookStatus, setBookStatus] = useState(bookInProgress)
	const [comment, setComment] = useState("")
	const [commentEditing, setCommentEditing] = useState(false)

	const onStarClick = (e) => {
		setRating({
			id,
			rating: e.target.ariaPosInSet
		})
	}
	const addComment = () => {
		setCommentEditing(false)
		addDescription({
			id,
			text: comment
		})
	}
	const onStatusClick = () => {
		setBookStatus(!bookStatus)
		handleBookStatus({
			bookInProgress: !bookStatus,
			id
		})
	}
	const onDeleteBtnClick = () => {
		deleteBook(id)
	}
	return (
		<Table.Row >
			<Table.Cell>
				<Header as='h2' textAlign='center'>
					<img src={image} alt="book" />
				</Header>
			</Table.Cell>
			<Table.Cell singleLine>
				{title}
				<Button onClick={onDeleteBtnClick} size='mini' floated='right' circular color='google plus' icon='trash alternate outline' /></Table.Cell>
			<Table.Cell>
				<Rating onClick={onStarClick} icon='star' defaultRating={rating} maxRating={10} />
			</Table.Cell>
			<Table.Cell textAlign='center'>
				<div>
					{bookStatus
						? <Button onClick={onStatusClick} compact positive active>In Progress</Button>
						: <Button onClick={onStatusClick} compact>Finished</Button>
					}
				</div>
			</Table.Cell>
			<Table.Cell>
				{commentEditing
					? <input value={comment} onChange={e => setComment(e.currentTarget.value)} onBlur={addComment}></input>
					: <div onClick={() => setCommentEditing(true)}>{myDescription}</div>}
			</Table.Cell>
		</Table.Row>
	)
}

export default MyLibraryItem
