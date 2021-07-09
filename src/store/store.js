import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import books from "./reducers/books"
import myLibrary from "./reducers/myLibrary"
import filter from "./reducers/filter"
import login from "./reducers/login"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
	books,
	myLibrary,
	filter,
	login
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store