import React from 'react';
import './App.css';
import TodoList from "./TodoList";

// component
function App() {
    // BLL (бизнес логика, хранение данных):
    const todoListTitle = "What to learn"
    const tasks = [
        // для однородных элементов создаются идентификаторы
        {id: 1, title: "HTML&CSS", isDone: true}, // => <li>{...}</li>
        {id: 2, title: "JS", isDone: true}, // => <li>{...}</li>
        {id: 3, title: "React", isDone: false}, // => <li>{...}</li>
        {id: 10, title: "Redux", isDone: false}, // => <li>{...}</li>
        {id: 11, title: "RTK", isDone: false}, // => <li>{...}</li>
    ]

    // GUI:
    return (
        <>
            <TodoList tasks={tasks} title={todoListTitle}/>
        </>
    );
}

export default App;



