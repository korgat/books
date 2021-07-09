
import React, { useState } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import firebase from "../../firebase"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [emailErr, setEmailErr] = useState("")
	const [passwordErr, setPasswordErr] = useState("")
	const [login, setLogin] = useState(true)

	const onLoginClick = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch((err) => {
				switch (err.code) {
					case "auth/invalid-email":
					case "auth/user-disabled":
					case "auth/user-not-found":
						setEmailErr(err.message)
						break
					case "auth/wrong-password":
						setPasswordErr(err.message)
						break
				}
			})
	}

	const onSignUpClick = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(cred => {
				firebase.firestore()
					.collection("UsersLibrary")
					.doc(cred.user.uid).set({ books: [], booksIds: [], userId: cred.user.uid })
			})
			.catch((err) => {
				console.log(err)
				switch (err.code) {
					case "auth/email-already-in-use":
					case "auth/invalid-email":
						setEmailErr(err.message)
						break
					case "auth/weak-password":
						setPasswordErr(err.message)
						break
				}
			})
	}

	return (
		<div className="margin50">
			<Segment placeholder>
				<Grid columns={2} relaxed='very' stackable>
					<Grid.Column>
						<Form>
							<Form.Input
								value={email}
								onChange={e => setEmail(e.currentTarget.value)}
								icon='user'
								iconPosition='left'
								label='Email'
								placeholder='Username'
								error={emailErr !== "" && {
									content: emailErr,
									pointing: 'below',
								}}
							/>
							<Form.Input
								value={password}
								onChange={e => setPassword(e.currentTarget.value)}
								icon='lock'
								iconPosition='left'
								label='Password'
								type='password'
								error={passwordErr !== "" && {
									content: passwordErr,
									pointing: 'below',
								}}
							/>
							{login
								? <Button onClick={onLoginClick} content='Login' primary />
								: <Button onClick={onSignUpClick} content='Sign Up' primary />}
						</Form>
					</Grid.Column>
					<Grid.Column verticalAlign='middle'>
						{login
							? <Button onClick={() => setLogin(!login)} content='Sign up' icon='signup' size='big' />
							: <Button onClick={() => setLogin(!login)} content='Login' icon='signup' size='big' />}
					</Grid.Column>
				</Grid>
				<Divider vertical>Or</Divider>
			</Segment>
		</div>
	)
}

export default Login
