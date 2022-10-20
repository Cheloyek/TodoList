import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
            <li key={t.id} className={t.isDone ? "isDone" : "notIsDone"}>
                <input
                    onChange={changeTaskStatus}
                    type={"checkbox"}
                    checked={t.isDone}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/> {/*редактирование строки*/}
                {/*<span>{t.title}</span>*/}
                <button onClick={removeTask}>x</button>
            </li>
        )
    }

    //создание task
    const tasksList = props.tasks.length             // если не пустой массив (props.tasks.length)
        ? props.tasks.map(getTasksListItem) // то создаем список и внутрь список объектов
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
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/> {/*компонента добавляет tasks*/}
            <ul>
                {tasksList}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button
                    // если нажата кнопка 'all' присваивает className activeBtn, если не нажата btn
                    className={props.filter === 'all' ? 'active-btn btn' : 'btn'}
                    // onClick={() => props.changeFilter("all")}
                    onClick = {handlerCreator('all')}
                >All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-btn btn' : 'btn'}
                    onClick={handlerCreator("active")}
                >Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-btn btn' : 'btn'}
                    onClick={handlerCreator("completed")}
                >Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;