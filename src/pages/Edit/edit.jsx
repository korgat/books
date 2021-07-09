import React, { useState } from 'react'
import { Form, Rating, Placeholder } from 'semantic-ui-react'
import firebase from "../../firebase"

const Edit = () => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [rating, setRating] = useState("")
	const [image, setImage] = useState("")
	const [description, setDescription] = useState("")

	const onSubmit = (e) => {
		const obj = {
			title, author, rating, description,
		}
		firebase.firestore()
			.collection("allBooks")
			.add(obj)
		console.log({ title, author, rating, description })
	}

	const onStarClick = (e) => {
		setRating(e.target.ariaPosInSet)
	}

	return (
		<div className="margin50">
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Input value={title} onChange={e => setTitle(e.currentTarget.value)} label='Book title' placeholder='Book title' width={6} />
				</Form.Group>
				<Form.Group>
					<Form.Input value={author} onChange={e => setAuthor(e.currentTarget.value)} label='Author' placeholder='Author' width={6} />
				</Form.Group>
				<Form.Group>
					<Form.Input value={image} onChange={e => setImage(e.currentTarget.value)} label='Book Image' placeholder='http://...' width={12} />
					{image
						? <img src={image} />
						: <Placeholder style={{ height: 150, width: 200 }}>
							<Placeholder.Image />
						</Placeholder>}
				</Form.Group>
				<Form.Group>
					<Form.Field label='Book rating' />
					<Rating icon='star' onClick={onStarClick} defaultRating={5} maxRating={10} />
				</Form.Group>
				<Form.Field value={description} onChange={e => setDescription(e.currentTarget.value)} label='Book description' control='textarea' rows='3' />
				<Form.Field label='Add book' control='button'>
					Confirm
				</Form.Field>
			</Form>
		</div>
	)
}

export default Edit
