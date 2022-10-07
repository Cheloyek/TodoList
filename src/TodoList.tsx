import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

// props type
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType> // tasks с типом TaskType
    filter: FilterValuesType
    removeTask: (taskId:string) => void, //void всегда возвращает undefined, void может быть заменен на другой тип
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title:string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

// rsc
// в функцию передали props (параметры функции).props - объект
// привязали функцию к кнопке
const TodoList = (props: TodoListPropsType) => {
    //local state для хранения ввода до нажатия кнопки
    const [title, setTitle] = useState<string>('')

    //хранение данных о вводе с ошибкой, если получено true - перерисует компоненту. Когда пользователь нажмет кнопку
    const [error, setError] = useState<boolean>(false)
    // console.log(title)
    //
    const getTasksListItem = (t: TaskType) => {
        const removeTask = () => props.removeTask(t.id)

//изменение isDone каждой таски
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>)=>props.changeTaskStatus(t.id, e.currentTarget.checked)
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
    //если что-то есть (props.tasks.length) то покажет props.tasks.map(getTasksListItem), если нет то выведет сообщение
    const tasksList = props.tasks.length
        ? props.tasks.map(getTasksListItem)
        : <span>Your taskslist is empty</span>
    const addTask = () => {
        const trimmedTitle = title.trim()// удаляет пробелы из начала и конца строки
        // если при вводе есть данные то добавляет task, если нет данных то передает в setError true
        if(trimmedTitle !== ''){
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)

    const onEnterDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false); {/*когда после ошибки пользователь начинает вводить, ошибка исчезает*/}
        setTitle(e.currentTarget.value)
    }

    //сообщение об ошибке. Если error есть выведет <div>Title is required!</div>, если нет ошибки =null, элемент не создаст
    const errorMessage = error ? <div style={{fontWeight: "bold", color: "hotpink"}}>Title is required!</div>: null

    return (
        <div>
            <h3>{props.title}</h3>
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