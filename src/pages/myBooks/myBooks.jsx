import React, { useState } from 'react'
import MenuComponent from '../../components/menu'
import MyBooksList from '../../components/myBooksList'


const MyBooks = ({ chosenBooks, sortDirection, sortType }) => {
	const [searchString, setSearchString] = useState("")
	return (
		<div>
			<MenuComponent searchString={searchString} setSearchString={setSearchString} sortDirection={sortDirection} />
			<MyBooksList searchString={searchString} sortType={sortType} sortDirection={sortDirection} chosenBooks={chosenBooks} />
		</div>
	)
}

export default MyBooks
