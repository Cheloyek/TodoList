import React, {ChangeEvent, FC} from "react";
import {TasksStateType, TodoListType} from "./AppWithRedux";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {DeleteForeverTwoTone} from "@material-ui/icons";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {TaskType} from "./TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from "./store/todolists-reducer";

export type TodoListWithReduxPropsType = {
    todolist: TodoListType
}

const TodoListWithRedux: FC<TodoListWithReduxPropsType> =({todolist}) => {
    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    //получить элемент списка
    const getTasksListItem = (t: TaskType) => {
        // const removeTask = () => props.removeTask(t.id, props.todoListId)
        const removeTask = () => dispatch(removeTaskAC(t.id, id))
        //изменение isDone каждой task
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>)=> {
            let newIsDoneValue = e.currentTarget.checked
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id))
        }

        //редактирование taskTitle
        const changeTaskTitle = (title: string) => {
            dispatch(changeTaskTitleAC(t.id,title,id))
        }



        return (
            //если isDone = true, применит класс isDone css
            <ListItem
                key={t.id}
                style={{
                    textDecoration: t.isDone ? 'line-through' : 'none', //зачеркивает text при нажатии выполнить
                    padding: '0px' ,
                    justifyContent: 'space-between'}}
                className={t.isDone ? "isDone" : "notIsDone"}>
                <Checkbox /*material UI Checkbox*/
                    onChange={changeTaskStatus}
                    size={'small'}
                    checked={t.isDone}
                    color={'primary'}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/> {/*редактирование строки*/}
                <IconButton onClick={removeTask} size={'small'}><DeleteForeverTwoTone fontSize={'medium'} color={'secondary'}/></IconButton>
            </ListItem>
        )
    }



    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    //создание task
    const tasksList = filteredTasks.length             // если не пустой массив (props.tasks.length)
        ? <List> {filteredTasks.map(getTasksListItem)} </List>// то создаем список и внутрь список объектов
        : <span>Your taskslist is empty</span>       // если пустой


    const addTask = (title: string) => {
        // props.addTask(title, props.todoListId)
        dispatch(addTaskAC(title, id))
    }

    //функция возвращает функцию
    // const handlerCreator = (filter: FilterValuesType) => () => dispatch(ChangeTodoListFilterAC(filter, id))
    const onAllClickHandler = () => dispatch(ChangeTodoListFilterAC("all", id))
    const onActiveClickHandler = () => dispatch(ChangeTodoListFilterAC("active", id))
    const onCompletedClickHandler = () => dispatch(ChangeTodoListFilterAC("completed", id))
    const removeTodoList = () => dispatch(RemoveTodoListAC(id))
    //изменение названия листа
    const changeTodoListTitle = (title:string) => dispatch(ChangeTodoListTitleAC(title, id))

    // if (filter === "active") {
    //     filteredTasks = tasks.filter(t => t.isDone === false)
    // }
    // if (filter === "completed") {
    //     filteredTasks = tasks.filter(t => t.isDone === true)
    // }

    return (
        <div style={{width: '250px'}}>
            <Typography variant={'h5'} align={'center'} style={{fontWeight: 'bold'}}>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                <Button onClick={removeTodoList} variant="outlined" size={'small'} color={'secondary'}>x</Button>
            </Typography>
            <AddItemForm addItem={addTask}/> {/*компонента добавляет tasks*/}
            <List>
                {tasksList}
            </List>
            <div>
                {/*добавляет в общий контейнер все кнопки при отображении*/}
                <ButtonGroup
                    fullWidth={true}
                    size="small"
                >
                    <Button
                        // если нажата кнопка 'all' присваивает className activeBtn, если не нажата btn
                        className={filter === 'all' ? 'active-btn btn' : 'btn'}
                        onClick={onAllClickHandler}
                        variant='contained'
                        color={filter === 'all' ? 'primary' : 'default'}
                        style={{marginRight: '3px', fontSize:'10px'}}
                    >All
                    </Button>
                    <Button
                        className={filter === 'active' ? 'active-btn btn' : 'btn'}
                        onClick={onActiveClickHandler}
                        color={filter === 'active' ? 'primary' : 'default'}
                        variant="contained"
                        style={{marginRight: '3px', fontSize:'10px'}}
                    >Active
                    </Button>
                    <Button
                        className={filter === 'completed' ? 'active-btn btn' : 'btn'}
                        onClick={onCompletedClickHandler}
                        variant="contained"
                        color={filter === 'completed' ? 'primary' : 'default'}
                        style={{marginRight: '3px', fontSize:'10px'}} //отступ
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default TodoListWithRedux