import React, { useState, useEffect, useRef } from 'react'
import Todo from './Todo';

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import "./App.css"

interface todo {
	info: string,
	done: boolean
}

function App() {
	const [todos, SetTodos] = useState<todo[]>(JSON.parse(localStorage.getItem("todo") || "[]"));

	let [textBoxValue, _setTextBoxValue] = useState<string>("")

	useEffect(() => {
		localStorage.setItem("todo", JSON.stringify(todos))
	}, [todos])

	function toggleDone(index: number) {
		let newArray = [...todos]

		newArray[index].done = !newArray[index].done

		SetTodos(newArray)
	}

	function removeItem(index: number) {
		SetTodos(todos.filter((_, arrindex) => arrindex != index))
	}

	function addItem() {
		SetTodos([...todos, { info: textBoxValue, done: false }])
		_setTextBoxValue("");
	}

	function allDone() {
		let newArray = [...todos]

		newArray.forEach((_, index) => {
			newArray[index].done = true;
		})

		SetTodos(newArray)
	}

	return (
		<div className="container">
			<h1>My epic todo app</h1>
			<div className="todos">
				{todos?.map((value, index) => 
					<Todo 
						onDoneToggle={toggleDone}
						onRemove={removeItem}

						done={value.done}
						info={value.info}
						index={index} 
						key={index}
					/>
				)}
				{( todos.length >= 2 ? 
					<div style={{ marginLeft: "0.4em" }}>
						<Button variant="contained" onClick={allDone}>Mark all as done</Button>
						<Button variant="contained" onClick={() => SetTodos([])}>Remove all</Button>
					</div> 
					: <></>
				)}
			</div>

			<div className="AddItem">
				<p>Add todo</p>

				<TextField 
					variant="standard" 
					label="Todo name" 
					onChange={e => _setTextBoxValue(e.target.value)} 
					value={textBoxValue}></TextField>
				
				<Button variant="contained" onClick={addItem} color="primary">Add</Button>
			</div>
		</div>
		
	)
}

export default App
