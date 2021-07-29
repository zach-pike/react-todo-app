import React, { useState, useEffect, useRef } from 'react'
import Todo from './Todo';

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

import "./App.css"

interface todo {
	info: string,
	done: boolean,
	id: string
}


function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
    	result += characters.charAt(Math.floor(Math.random() * charactersLength));
   	}
   return result;
}

function App() {
	const [todos, SetTodos] = useState<todo[]>(JSON.parse(localStorage.getItem("todo") || "[]"));
	const [sortedList, _setSorted] = useState<todo[]>([]);
	//textbox state
	let [textBoxValue, _setTextBoxValue] = useState<string>("")

	//save todo when it changes
	useEffect(() => {
		localStorage.setItem("todo", JSON.stringify(todos))

		//sort list for display
		let done: todo[] = [];
		let undone: todo[] = [];

		todos.forEach((item) => {
			if (item.done)
				done.push(item)
			else
				undone.push(item);
		})

		_setSorted([...undone, ...done])
	}, [todos])

	//functions for modifying the todo
	function toggleDone(id: string) {
		let newArray = [...todos]

		//find which todo has the specified id
		let indexOfElem = newArray.findIndex(value => value.id == id)

		//toggle it
		newArray[indexOfElem].done = !newArray[indexOfElem].done

		//set the state
		SetTodos(newArray)
	}
	function removeItem(id: string) {
		SetTodos(todos.filter((value) => value.id != id))
	}
	function addItem() {
		if (textBoxValue != "") {
			SetTodos([...todos, { info: textBoxValue, done: false, id: makeid(16) }])
			_setTextBoxValue("");
		}
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
			<h1>Todo</h1>
			<div className="todos">
				{sortedList.map((value, index) => 
					<Todo 
						onDoneToggle={toggleDone}
						onRemove={removeItem}

						done={value.done}
						info={value.info}
						index={value.id} 
						key={index}
					/>
				)}

				{/* make the buttons invisible if there are less than 2 items on the todo */}
				{/* 0.4em comes from /src/Todo.css, class: TodoItem, and makes sure the buttons dont overhang the list */}
				
				<div style={{ marginLeft: "0.4em", marginRight: "0.4em", visibility: ( todos.length >= 2 ? "visible" : "hidden" ) }}>
					<Button variant="contained" onClick={allDone}>Mark all as done</Button>
					<Button variant="contained" onClick={() => SetTodos([])}>Remove all</Button>
				</div>
			</div>

			<div className="AddItem">
				<p>Add todo</p>

				<TextField 
					variant="standard" 
					label="Todo name" 
					onChange={e => _setTextBoxValue(e.target.value)} 
					value={textBoxValue}
					onKeyDown={(e) => { if (e.key == "Enter") addItem() }}></TextField>
				
				<Button variant="contained" onClick={addItem} color="primary">Add</Button>
			</div>
		</div>
		
	)
}

export default App
