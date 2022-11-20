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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "./store/store";

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
function AppWithRedux() {

    // BLL (бизнес логика, хранение данных):
    // с возможностью удаления/добавления новых листов

    // <тип state, ожидаемое значение>
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    //удаление task
    // если значение true добавит task в новый массив
    // у одного значение совпаден и вернет false, в массив не попадет
    // перезапишем переменную tasks
    // функцию нужно передать через props в TodoList и добавить в Type
    const removeTask = (taskId: string, todoListId: string) => {
        let action = removeTaskAC(taskId, todoListId)
        dispatch(action)
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        //создание копии масс листов, в массиве проверяет каждый и находит t.id === todoListId и создается копия листа в filter: filter
        let action = ChangeTodoListFilterAC(filter, todoListId)
        dispatch(action)
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        let action = ChangeTodoListTitleAC(title, todoListId)
        dispatch(action)
    }

    //удаление листа
    const removeTodoList = (todoListId: string) => {
        dispatch(RemoveTodoListAC(todoListId))
    }

        //при нажатии на checkbox находит значение и меняет isDone
    const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
        let action = changeTaskStatusAC(taskId, newTaskStatus, todoListId)
        dispatch(action)
    }

    //редактирование taskTitle
    const changeTaskTitle = (taskId: string, title: string, todoListId:string) => {
        let action = changeTaskTitleAC(taskId,title,todoListId)
        dispatch(action)
    }

    //-----ДОБАВЛЕНИЕ нового листа, пользователь передает title------
    const addTodoList = (title:string) => {
        dispatch(AddTodoListAC(title))
    }

    //добавление task
    const addTask = (title: string, todoListId: string) => {
        let action = addTaskAC(title, todoListId)
        dispatch(action)
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

export default AppWithRedux;



