import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {DeleteForeverTwoTone} from "@material-ui/icons";

// props type
type TodoListPropsType = {
    todoListId: string // id каждого листа
    title: string // title каждого листа
    tasks: Array<TaskType> // tasks с типом TaskType
    filter: FilterValuesType
    removeTask: (taskId:string, todoListId: string) => void, //void всегда возвращает undefined, void может быть заменен на другой тип
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title:string, todoListId: string, ) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId:string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

// rsc
// в функцию передали props (параметры функции).props - объект
// привязали функцию к кнопке
// функция вызывается количество раз = количество листов
const TodoList = (props: TodoListPropsType) => {

    //получить элемент списка
    const getTasksListItem = (t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListId)
        //изменение isDone каждой task
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>)=>props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        //редактирование taskTitle
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle (t.id, title, props.todoListId)
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
                {/*<input onChange={changeTaskStatus} type={"checkbox"} checked={t.isDone}/> самодельный checkbox*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/> {/*редактирование строки*/}
                {/*<span>{t.title}</span>*/}
                {/*<button onClick={removeTask}>x</button>*/}
                <IconButton onClick={removeTask} size={'small'}><DeleteForeverTwoTone fontSize={'medium'} color={'secondary'}/></IconButton>
            </ListItem>
        )
    }

    //создание task
    const tasksList = props.tasks.length             // если не пустой массив (props.tasks.length)
        ? <List> {props.tasks.map(getTasksListItem)} </List>// то создаем список и внутрь список объектов
        : <span>Your taskslist is empty</span>       // если пустой


    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }

    //функция возвращает функцию
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)


    const removeTodoList = () => props.removeTodoList(props.todoListId)
    //изменение названия листа
    const changeTodoListTitle = (title:string) => props.changeTodoListTitle(title, props.todoListId)
    return (
        <div style={{width: '250px'}}>
            <Typography variant={'h5'} align={'center'} style={{fontWeight: 'bold'}}>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <Button onClick={removeTodoList} variant="outlined" size={'small'} color={'secondary'}>x</Button>
            </Typography>
            <AddItemForm addItem={addTask}/> {/*компонента добавляет tasks*/}
            <List>
                {tasksList}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>*/}
            </List>
            <div>
                {/*добавляет в общий контейнер все кнопки при отображении*/}
                <ButtonGroup
                    fullWidth={true}
                    size="small"
                >
                    <Button
                        // если нажата кнопка 'all' присваивает className activeBtn, если не нажата btn
                        className={props.filter === 'all' ? 'active-btn btn' : 'btn'}
                        // onClick={() => props.changeFilter("all")}
                        onClick={handlerCreator('all')}
                        variant='contained'
                        color={props.filter === 'all' ? 'primary' : 'default'}
                        style={{marginRight: '3px', fontSize:'10px'}}
                    >All
                    </Button>
                    <Button
                        className={props.filter === 'active' ? 'active-btn btn' : 'btn'}
                        onClick={handlerCreator("active")}
                        color={props.filter === 'active' ? 'primary' : 'default'}
                        variant="contained"
                        style={{marginRight: '3px', fontSize:'10px'}}
                    >Active
                    </Button>
                    <Button
                        className={props.filter === 'completed' ? 'active-btn btn' : 'btn'}
                        onClick={handlerCreator("completed")}
                        variant="contained"
                        color={props.filter === 'completed' ? 'primary' : 'default'}
                        style={{marginRight: '3px', fontSize:'10px'}} //отступ
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default TodoList;