
import './App.css';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container } from 'semantic-ui-react'
import Main from './pages/main/main';
import MyBooks from './pages/myBooks/myBooks';
import Edit from './pages/Edit/edit';
import Login from './pages/login/login';
import { setAllBooks } from './store/actions/setBooks';
import { setUser } from './store/actions/setLogin';
import { clearMyLibrary, setMyLibrary } from './store/actions/setLibrary';
import firebase from "./firebase"


function App() {
	const dispatch = useDispatch()
	const { allBooks, chosenBooks, booksInLibrary, sortType, sortDirection, user, myLibrarySearch } = useSelector(state => ({
		allBooks: state.books.books,
		chosenBooks: state.myLibrary.books,
		booksInLibrary: state.myLibrary.booksIds,
		sortType: state.filter.sortType,
		sortDirection: state.filter.sortDirection,
		user: state.login.user,
		myLibrarySearch: state.myLibrary.searchString
	}))

	const [btnStatus, setBtnStatus] = useState(false)

	const onLogoutClick = () => {
		firebase.auth().signOut()
		dispatch(clearMyLibrary())
	}

	useEffect(() => {
		const unsubscribe1 = firebase.firestore()
			.collection("allBooks")
			.orderBy(sortType, sortDirection)
			.onSnapshot(onSnapshot => {
				const newArray = onSnapshot.docs.reduce((newArr, doc) => {
					newArr.push({ ...doc.data(), id: doc.id })
					return newArr
				}, [])
				dispatch(setAllBooks(newArray))
			})
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				firebase.firestore()
					.collection("UsersLibrary")
					.doc(user.uid)
					.get().then(doc => {
						dispatch(setMyLibrary(doc.data()))
					})
				dispatch(setUser(user))
			} else {
				dispatch(setUser(""))
			}
		})
		return () => {
			unsubscribe1()
		}
	}, [sortType, sortDirection])

	return (
		<div className="app">
			<Container>
				<div className="btn">
					{user && user.email === "admin@gmail.com" && <div><Link to="/edit"><Button positive>Add book to library</Button></Link></div>}
					<div>
						{user
							? <Button onClick={onLogoutClick} primary>Logout</Button>
							: <Link to="/login"><Button primary>Login/SignUp</Button></Link>
						}
						<Link to="/books"><Button onClick={() => setBtnStatus(false)} secondary={btnStatus} positive={!btnStatus}>Books</Button></Link>
						<Link to="/myLibrary"><Button onClick={() => setBtnStatus(true)} positive={btnStatus} secondary={!btnStatus}>My library</Button></Link>
					</div>
				</div>
				{user
					? <Switch>
						<Route path="/myLibrary" render={() => <MyBooks
							chosenBooks={chosenBooks}
							sortDirection={sortDirection}
							sortType={sortType}
							myLibrarySearch={myLibrarySearch}
						/>} />
						<Route path="/books" exact render={() => <Main
							user={user}
							books={allBooks}
							booksInLibrary={booksInLibrary}
							sortDirection={sortDirection} />} />
						<Route path="/edit" render={() => <Edit />} />
						<Redirect to="/books" />
					</Switch>
					: <Switch>
						<Route path="/myLibrary" render={() => <MyBooks
							chosenBooks={chosenBooks}
							sortDirection={sortDirection}
							sortType={sortType}
							myLibrarySearch={myLibrarySearch}
						/>} />
						<Route path="/books" exact render={() => <Main
							books={allBooks}
							booksInLibrary={booksInLibrary}
							sortDirection={sortDirection} />} />
						<Route path="/edit" render={() => <Edit />} />
						<Route path="/login" render={() => <Login />} />
					</Switch>}
			</Container >
		</div>
	);
}

export default App;
