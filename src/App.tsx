import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


// component
function App() {
    // BLL (бизнес логика, хранение данных):
    const todoListTitle: string = "What to learn"

    // let tasks: Array<TaskType> = [
    //     {id: 1, title: "HTML&CSS", isDone: true}, // => <li>{...}</li>
    //     {id: 2, title: "JS", isDone: true}, // => <li>{...}</li>
    //     {id: 3, title: "React", isDone: false}, // => <li>{...}</li>
    //     {id: 10, title: "Redux", isDone: false}, // => <li>{...}</li>
    //     {id: 11, title: "RTK", isDone: false}, // => <li>{...}</li>
    // ];
    //React.useState()
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true}, // => <li>{...}</li>
        {id: 2, title: "JS", isDone: true}, // => <li>{...}</li>
        {id: 3, title: "React", isDone: false}, // => <li>{...}</li>
        {id: 10, title: "Redux", isDone: false}, // => <li>{...}</li>
        {id: 11, title: "RTK", isDone: false}, // => <li>{...}</li>
    ])
    // или так
    // let tasks = result[0] // переменная для хранения данных
    // const setTasks = result[1]//позволяет передавать измененные данные, чтобы реакт их отрисовал

    //удаление task
    // если значение true добавит task в новый массив
    // у одного значение совпаден и вернет false, в массив не попадет
    // перезапишем переменную tasks
    // функцию нужно передать через props в TodoList и добавить в Type
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((t) => t.id !== taskId)) // true || false проверяет каждое значение
        console.log(tasks)
    }

    // GUI:
    return (
        <div className="App">
            <TodoList
                tasks={tasks}
                title={todoListTitle}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;



