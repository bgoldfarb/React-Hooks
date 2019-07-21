import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Todo = (props) => {
    const [todoName, setTodoName] = useState(''); //useState must be at top lvl, can't be in any nest
    const [todoList, setToDoList] = useState([])

    //hooks into React, executes gets at right time, executs after each render cycle
    //second arg, val to look for in order to call function
    useEffect(() => {
        axios.get('firebase.json').then(result => {
            const todoData = result.data;
            const todos = []
            for(const key in todoDate){
                todos.push({id: key, name: todoData[key].name})
            }
            setToDoList(todos)
        })
        return () => {
            //executes this at a clean up
            console.log("Cleanup")
        }
    }, [])

    const inputChangeHandler = (event) => {
        setTodoName(event.target.value)
    }

    const todoAddHandler = () => {
        setToDoList(todoList.concat(todoName))
        axios.post('firbase.json', {name: toDoName})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return <React.Fragment>
        <input 
            type="text" 
            placeholder="Todo" 
            onChange={inputChangeHandler} 
            value={todoName}

        />
        <button type="button" onClick = {todoAddHandler}>Add</button>
        <ul>
            {todoList.map((todo,index) => <li key={index}>{todo.name}</li>)}
        </ul>
    </React.Fragment>
}

export default Todo