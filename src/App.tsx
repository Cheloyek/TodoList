import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";




export type FilterValuesType = "all" | "active" | "completed" // filter Type

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
    //console.log(v1()) // всегда генерирует уникальную строку формата: b5354840-3e05-11ed-9204-b96e18166926
    const [filter, setFilter] = useState<FilterValuesType>("active") //filter

    // создан локальный state
    //v1() - генерирует уникальный id тип string
    // setTasks работает асинхронно
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true}, // => <li>{...}</li>
        {id: v1(), title: "JS", isDone: true}, // => <li>{...}</li>
        {id: v1(), title: "React", isDone: false}, // => <li>{...}</li>
        {id: v1(), title: "Redux", isDone: false}, // => <li>{...}</li>
        {id: v1(), title: "RTK", isDone: false}, // => <li>{...}</li>
    ])
    // или так
    // let tasks = result[0] // переменная для хранения данных
    // const setTasks = result[1]//позволяет передавать измененные данные, чтобы реакт их отрисовал

    //удаление task
    // если значение true добавит task в новый массив
    // у одного значение совпаден и вернет false, в массив не попадет
    // перезапишем переменную tasks
    // функцию нужно передать через props в TodoList и добавить в Type
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId)) // true || false проверяет каждое значение
        console.log(tasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const changeTaskStatus = (taskId: string, newStatus: boolean) => {
        //при нажатии на checkbox находит значение и меняет isDone
        const updatedTasks: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newStatus} : t)
            //создается новый массив? в котором лежат старые tasks и у task у которых id === taskID меняется значение isDone
        // ...t = {id: v1(), title: "HTML&CSS", isDone: true}

        //перерисовывание
        setTasks(updatedTasks)
    }

    //добавление task
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        //добавление новой task в список
        // const copyTasks = [...tasks]
        // copyTasks.push(newTask)
        // setTasks(copyTasks)
        setTasks([...tasks, newTask])
    }

    const getFilteredTasks = (t: Array<TaskType>, filter: FilterValuesType) => {
        let tasksForTodoList = t;
        if (filter === "active") {
            tasksForTodoList = t.filter(t => !t.isDone)
        }
        if (filter === "completed") {
            tasksForTodoList = t.filter(t => t.isDone)
        }
        return tasksForTodoList
    }



    // GUI:
    return (
        <div className="App">
            <TodoList tasks={getFilteredTasks(tasks, filter)}
                title={todoListTitle}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;



