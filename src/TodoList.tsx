import React from 'react';

// props type
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType> // tasks с типом TaskType
    removeTask: (taskId:number) => void //void всегда возвращает undefined, void может быть заменен на другой тип
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

// rsc
// в функцию передали props (параметры функции).props - объект
// привязали функцию к кнопке
const TodoList = (props: TodoListPropsType) => {
    const getTasksListItem = (t: TaskType) => {
        return (
            <li key={t.id}>
                <input type={"checkbox"} checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    }
    const tasksList = props.tasks.map(getTasksListItem)
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;