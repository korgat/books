import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Input, Menu, Icon } from 'semantic-ui-react'
import { setSortType, setSortDirection } from '../store/actions/setFilter'


const MenuComponent = ({ sortDirection, searchString, setSearchString }) => {
	const dispatch = useDispatch()
	const [activeSortType, setActiveSortType] = useState("title")
	const btnHandler = (e, { name }) => {
		setActiveSortType(name)
		dispatch(setSortType(name))
	}
	const onSortDirection = (direction) => {
		dispatch(setSortDirection(direction))
	}
	const onSearchChange = (text) => {
		setSearchString(text)
	}

	return (
		<div className="menu">
			<Menu pointing>
				<Menu.Item> Sort by:</Menu.Item>
				<Menu.Item
					name='title'
					active={activeSortType === 'title'}
					onClick={btnHandler}
				/>
				<Menu.Item
					name='author'
					active={activeSortType === 'author'}
					onClick={btnHandler}
				/>
				<Menu.Item
					name='rating'
					active={activeSortType === 'rating'}
					onClick={btnHandler}
				/>
				<Menu.Menu position='right'>
					<Menu.Item>
						<Button.Group>
							<Button onClick={() => onSortDirection("asc")} positive={sortDirection === "asc"}>
								<div><Icon name='long arrow alternate up' size='large' /></div>
							</Button>
							<Button.Or text='or' />
							<Button onClick={() => onSortDirection("desc")} positive={sortDirection === "desc"} >
								<div><Icon name='long arrow alternate down' size='large' /></div>
							</Button>
						</Button.Group>
					</Menu.Item>
					<Menu.Item>
						<Input icon='search' value={searchString} onChange={(e) => onSearchChange(e.currentTarget.value)} placeholder='Search...' />
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		</div>

	)
}

export default MenuComponent
