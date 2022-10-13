import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

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
    //local state для хранения ввода до нажатия кнопки
    const [title, setTitle] = useState<string>('')

    //хранение данных о вводе с ошибкой, если получено true - перерисует компоненту. Когда пользователь нажмет кнопку
    const [error, setError] = useState<boolean>(false)

    //получить элемент списка
    const getTasksListItem = (t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListId)
        //изменение isDone каждой task
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>)=>props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        return (
            //если isDone = true, применит класс isDone css
            <li key={t.id} className={t.isDone ? "isDone" : "notIsDone"}>
                <input
                    onChange={changeTaskStatus}
                    type={"checkbox"}
                    checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    }

    //создание task
    const tasksList = props.tasks.length             // если не пустой массив (props.tasks.length)
        ? props.tasks.map(getTasksListItem) // то создаем список и внутрь список объектов
        : <span>Your taskslist is empty</span>       // если пустой

    const addTask = () => {
        const trimmedTitle = title.trim()// удаляет пробелы из начала и конца строки
        // если при вводе есть данные то добавляет task, если нет данных то передает в setError true
        if(trimmedTitle !== ''){
            // добавление task с указанным названием в определенные лист props.todoListId
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle('')
    }

    //функция возвращает функцию
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)

    const onEnterDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false); {/*когда после ошибки пользователь начинает вводить, ошибка исчезает*/}
        setTitle(e.currentTarget.value)
    }
    const removeTodoList = () => props.removeTodoList(props.todoListId)

    //сообщение об ошибке. Если error есть выведет <div>Title is required!</div>, если нет ошибки =null, элемент не создаст
    const errorMessage = error ? <div style={{fontWeight: "bold", color: "hotpink"}}>Title is required!</div>: null

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodoList}>x</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitle}
                    onKeyDown={onEnterDownAddTask}
                    className={error ? 'error' : ''} // обработка error
                />
                <button onClick= {addTask}>+</button>
                {/*вывод сообщения при ошибке*/}
                {errorMessage}
            </div>
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