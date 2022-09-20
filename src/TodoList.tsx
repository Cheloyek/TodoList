import React from 'react';

// props type
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType> // tasks с типом TaskType
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

// rsc
// в функцию передали props (параметры функции).props - объект
const TodoList = (props: TodoListPropsType) => {

    const tasksList = props.tasks.map((task) => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
            </li>
        )
    })

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
};

export default TodoList;