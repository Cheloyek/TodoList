import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC, AddTodoListAT,
    ChangeTodoListFilterAC, ChangeTodoListFilterAT,
    ChangeTodoListTitleAC, ChangeTodoListTitleAT,
    RemoveTodoListAC, RemoveTodoListAT,
    todolistsReducer
} from "./store/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./store/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed" // filter Type

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType, //какие task показывает todolist
}

// тип для структуры данных, в которой хранятся tasks
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

// component
function AppWithReducers() {

    // BLL (бизнес логика, хранение данных):
    // с возможностью удаления/добавления новых листов

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    //local state для хранения списков
    // const [todoLists, setTodoLists] = useState<Array<TodoListType>> ([
    //     {id: todoListId_1, title: "What to learn", filter: "all"},
    //     {id: todoListId_2, title: "What to buy", filter: "all"},
    // ])
    const [todoLists, dispatchToTodoList] = useReducer(todolistsReducer, [
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])

    //local state для хранения tasks
    // const [tasks, setTasks] = useState<TasksStateType>({
    //     [todoListId_1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true}, // => <li>{...}</li>
    //         {id: v1(), title: "JS", isDone: true}, // => <li>{...}</li>
    //         {id: v1(), title: "React", isDone: false}, // => <li>{...}</li>
    //         {id: v1(), title: "Redux", isDone: false}, // => <li>{...}</li>
    //         {id: v1(), title: "RTK", isDone: false}, // => <li>{...}</li>
    //     ],
    //     [todoListId_2]: [
    //         {id: v1(), title: "Water", isDone: true}, // => <li>{...}</li>
    //         {id: v1(), title: "Beer", isDone: true}, // => <li>{...}</li>
    //         {id: v1(), title: "Toilet paper", isDone: false}, // => <li>{...}</li>
    //         {id: v1(), title: "Buckwheat", isDone: false}, // => <li>{...}</li>
    //         {id: v1(), title: "Meet", isDone: false}, // => <li>{...}</li>
    //     ],
    // })
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        // setTasks({...tasks,
        //     [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)
        // })

        let action = removeTaskAC(taskId, todoListId)
        dispatchToTasks(action)

    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        //создание копии масс листов, в массиве проверяет каждый и находит t.id === todoListId и создается копия листа в filter: filter
        // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter}: tl))

        let action = ChangeTodoListFilterAC(filter, todoListId)
        dispatchToTodoList(action)
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title}: tl))

        let action = ChangeTodoListTitleAC(title, todoListId)
        dispatchToTodoList(action)
    }

    //удаление листа
    const removeTodoList = (todoListId: string) => {
        //фильтр листов (у которых id !== todoListId удаляет лист)
        // setTodoLists(todoLists.filter(tl => tl.id !== todoListId)) // удаляет только лист, tasks не удалились
        // delete tasks[todoListId] // удаление tasks удаленного листа
        let action = RemoveTodoListAC(todoListId)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }

        //при нажатии на checkbox находит значение и меняет isDone
    const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
        //const updatedTasks: Array<TaskType> = tasks.map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
            //создается новый массив, в котором лежат старые tasks и у task у которых id === taskID меняется значение isDone
        // ...t = {id: v1(), title: "HTML&CSS", isDone: true}

        //создание массива [todoListId]: tasks[todoListId], map по каждой task для t.id === taskId добавление isDone: newTaskStatus
        // новый объект, внутри новый массив, внутри массива новая task, внутри которой произошли изменения
    //     setTasks({...tasks,
    //         [todoListId]: tasks[todoListId].map(t => t.id === taskId
    //             ? {...t, isDone: newTaskStatus}
    //             : t)
    // })
        let action = changeTaskStatusAC(taskId, newTaskStatus, todoListId)
        dispatchToTasks(action)
    }

    //редактирование taskTitle
    const changeTaskTitle = (taskId: string, title: string, todoListId:string) => {
        // setTasks({
        //     ...tasks,
        //     [todoListId]: tasks[todoListId].map(t => t.id === taskId
        //         ? {...t, title: title}
        //         : t)
        // })
        let action = changeTaskTitleAC(taskId,title,todoListId)
        dispatchToTasks(action)
    }

    //-----ДОБАВЛЕНИЕ нового листа, пользователь передает title------
    const addTodoList = (title:string) => {
        const newTodoListId: string = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all"
        }
        //const nextState = [...todolists, newTodoList]
        // setTodoLists([...todoLists, newTodoList]) /*добавляет todolist в массив листов*/
        // setTasks({...tasks, [newTodoListId]: [] }) /*в новый todoList добавили массив, в который будут добавляться новые tasks*/
        let action = AddTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }

    //добавление task
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        //создание копии, в копии создан новый массив, добавлен новый task в начало массива
        // setTasks({...tasks,
        //     [todoListId]: [newTask, ...tasks[todoListId]]})

        let action = addTaskAC(title, todoListId)
        dispatchToTasks(action)

        //добавление новой task в список
        // const copyTasks = [...tasks]
        // copyTasks.push(newTask)
        // setTasks(copyTasks)
        // setTasks([...tasks, newTask])
    }

    //функция получает Array и фильтрует по переданному фильтру tasks
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


    // проходится по массиву листов (каждый лист => возвращает return). В результате появится массив компонент
    const todoListComponents = todoLists.map(tl => {
        const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter) // tasks[tl.id] - получает массив всех task листа. tl.filter = "all" | "active" | "completed"
        return (
            <Grid item key={tl.id}>
            <Paper style={{width:'280px', padding:'20px'}} elevation={8}>
                <TodoList
                    //data
                    // key={tl.id}
                    title={tl.title}        // title из каждого листа
                    filter={tl.filter}      // "all" | "active" | "completed"
                    todoListId={tl.id}      //id из каждого листа для компонены
                    tasks={filteredTasks}

                    //functions
                    addTask={addTask}
                    removeTask={removeTask}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}
                    changeTodoListTitle={changeTodoListTitle}
                    changeTodoListFilter={changeTodoListFilter}
                />
            </Paper>
            </Grid>

        );
    })

    // GUI:
        return (
                <div className="App">
                    <AppBar position="static">
                        <Toolbar style={{justifyContent: "space-between"}}> {/*ToolBar - МЕНЮ*/}
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <Menu/>
                            </IconButton>
                            <Typography variant="h6">
                                Todolists
                            </Typography>
                            <Button color="inherit" variant={"outlined"}>Login</Button>
                        </Toolbar>
                    </AppBar>
                    <Container fixed>
                        <Grid container style={{padding: '5px'}}>
                    Добавить лист
                    <AddItemForm addItem={addTodoList}/>
                        </Grid>
                        <Grid container spacing={5}> {/*отступ между листами*/}
                            {todoListComponents}
                        </Grid>
                    </Container>
                </div>
            )
}

export default AppWithReducers;



