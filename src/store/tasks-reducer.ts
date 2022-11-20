import { TasksStateType } from "../App";
import {v1} from "uuid";
import {TaskType} from "../TodoList";
import {AddTodoListAC, RemoveTodoListAC} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeStatusTaskActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleTaskActionType = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistActionType = ReturnType<typeof AddTodoListAC>
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodoListAC>

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeStatusTaskActionType | ChangeTitleTaskActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD TASK': {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE STATUS TASK': {
            // const changeTitle: TaskType = {
            //     id: action.payload.id,
            //     title: ...state[action.payload.todolistId]
            //     isDone: action.payload.isDone
            // }
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                ? {...t, isDone: action.payload.isDone}
                : t)
            }
        }
        case 'CHANGE TITLE TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                ? {...t, title: action.payload.title}
                : t)
            }
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoListId]: []
            }
        }

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
            // const {[action.todolistId]: [], ...rest} = {...state}
            // return rest
        }

        default:
            // throw new Error("I don't understand this type")
            return state
    }
};



export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE TASK', taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD TASK', payload: {title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE STATUS TASK', payload: {taskId, isDone, todolistId}} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE TITLE TASK', payload: {taskId, title, todolistId}} as const
}

