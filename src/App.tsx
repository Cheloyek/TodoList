import React from 'react';
import './App.css';
import TodoList from "./TodoList";

function App() {
    // BLL (бизнес логика, хранение данных):
    const todoListTitle = "What to learn"
    const tasks = [
        // для однородных элементов создаются идентификаторы
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    const todoListTitle_2 = "What to buy"
    const tasks_2 = [
        {id: 1, title: "Beer", isDone: true},
        {id: 2, title: "Cheese", isDone: true},
        {id: 3, title: "Fish", isDone: false}
    ]
    // GUI:
    return (
        <div className="App">
            <TodoList tasks={tasks} title={todoListTitle}/>
            <TodoList tasks={tasks_2} title={todoListTitle_2}/>
        </div>
    );
}

export default App;
