import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

// props type
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType> // tasks с типом TaskType
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
    console.log(title)
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
    const tasksList = props.tasks.map(getTasksListItem)
    const addTask = () => {
        const trimmedTitle = title.trim()// удаляет пробелы из начала и конца строки
        if(trimmedTitle !== ''){
            props.addTask(trimmedTitle)
        }
        setTitle('')
    }

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)

    const onEnterDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitle}
                    onKeyDown={onEnterDownAddTask}
                />
                <button onClick= {addTask}>+</button>
            </div>
            <ul>
                {tasksList}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button
                    // onClick={() => props.changeFilter("all")}
                    onClick = {handlerCreator('all')}
                >All
                </button>
                <button
                    onClick={handlerCreator("active")}
                >Active
                </button>
                <button
                    onClick={handlerCreator("completed")}
                >Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;