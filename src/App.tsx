import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";




export type FilterValuesType = "all" | "active" | "completed" // filter Type

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType, //какие task показывает todolist
}

// тип для структуры данных, в которой хранятся tasks
type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

// component
function App() {
    // BLL (бизнес логика, хранение данных):
    // с возможностью удаления/добавления новых листов

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    //local state для хранения списков
    const [todoLists, setTodoLists] = useState<Array<TodoListType>> ([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])

    //local state для хранения tasks
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true}, // => <li>{...}</li>
            {id: v1(), title: "JS", isDone: true}, // => <li>{...}</li>
            {id: v1(), title: "React", isDone: false}, // => <li>{...}</li>
            {id: v1(), title: "Redux", isDone: false}, // => <li>{...}</li>
            {id: v1(), title: "RTK", isDone: false}, // => <li>{...}</li>
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true}, // => <li>{...}</li>
            {id: v1(), title: "Beer", isDone: true}, // => <li>{...}</li>
            {id: v1(), title: "Toilet paper", isDone: false}, // => <li>{...}</li>
            {id: v1(), title: "Buckwheat", isDone: false}, // => <li>{...}</li>
            {id: v1(), title: "Meet", isDone: false}, // => <li>{...}</li>
        ],
    })

    // ДО ДОБАВЛЕНИЯ BLL:
    // без возможности удаления/добавления новых листов
    //2 const todoListTitle: string = "What to learn"
    //1React.useState()
    //1console.log(v1()) // генерирует уникальную строку тип string формата: b5354840-3e05-11ed-9204-b96e18166926
    //2 const [filter, setFilter] = useState<FilterValuesType>("active") //filter
    // setTasks работает асинхронно
    //2 const [tasks, setTasks] = useState<Array<TaskType>>([
    //2     {id: v1(), title: "HTML&CSS", isDone: true}, // => <li>{...}</li>
    //2     {id: v1(), title: "JS", isDone: true}, // => <li>{...}</li>
    //2     {id: v1(), title: "React", isDone: false}, // => <li>{...}</li>
    //2     {id: v1(), title: "Redux", isDone: false}, // => <li>{...}</li>
    //2     {id: v1(), title: "RTK", isDone: false}, // => <li>{...}</li>
    //2 ])

    //удаление task
    // если значение true добавит task в новый массив
    // у одного значение совпаден и вернет false, в массив не попадет
    // перезапишем переменную tasks
    // функцию нужно передать через props в TodoList и добавить в Type
    const removeTask = (taskId: string, todoListId: string) => {

        // 1 вариант
        // const copyTasks = {...tasks} //копируется массив
        //фильтруем исходный массив
        // copyTasks[todoListId] = copyTasks[todoListId].filter((t) => t.id !== taskId)
        // setTasks(copyTasks) // передаем в setTasks скопированный и отфильтрованный массив

        // 2 вариант
        setTasks({...tasks,
            [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)
        })
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        //создание копии масс листов, в массиве проверяет каждый и находит t.id === todoListId и создается копия листа в filter: filter
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter}: tl))
    }
    //удаление листа
    const removeTodoList = (todoListId: string) => {
        //фильтр листов (у которых id !== todoListId удаляет лист)
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId)) // удаляет только лист, tasks не удалились
        delete tasks[todoListId] // удаление tasks удаленного листа
    }

        //при нажатии на checkbox находит значение и меняет isDone
    const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
        //const updatedTasks: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
            //создается новый массив, в котором лежат старые tasks и у task у которых id === taskID меняется значение isDone
        // ...t = {id: v1(), title: "HTML&CSS", isDone: true}

        //создание массива [todoListId]: tasks[todoListId], map по каждой task для t.id === taskId добавление isDone: newTaskStatus
        // новый объект, внутри новый массив, внутри массива новая task, внутри которой произошли изменения
        setTasks({...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? {...t, isDone: newTaskStatus}
                : t)
    })
    }

    //добавление task

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        //создание копии, в копии создан новый массив, добавлен новый task в начало массива
        setTasks({...tasks,
            [todoListId]: [newTask, ...tasks[todoListId]]})

        //добавление новой task в список
        // const copyTasks = [...tasks]
        // copyTasks.push(newTask)
        // setTasks(copyTasks)
        // setTasks([...tasks, newTask])
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
                changeFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;



