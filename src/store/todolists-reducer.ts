import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST" // тип действия
    todolistId: string      // id
}

export type AddTodoListAT ={
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todolistId: string
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todolistId: string
}

const initialState: Array<TodoListType> = []

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

// чистая функция нужна легко
// (объект, действие)

export const todolistsReducer = (state= initialState, action: ActionType): Array<TodoListType> => {
    //если в action будет removetodolist то вернет обновленный state
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            // const newTodoListId: string = v1()
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter}: tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title}: tl)
        default:
            return state
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", todolistId: id})
export const AddTodoListAC = (title: string) : AddTodoListAT => ({type: "ADD-TODOLIST", title: title, todoListId: v1() })
export const ChangeTodoListFilterAC = (filter: FilterValuesType , todolistid: string) : ChangeTodoListFilterAT => ({type: "CHANGE-TODOLIST-FILTER", filter: filter, todolistId:todolistid})
export const ChangeTodoListTitleAC = (title: string, todolistId: string) : ChangeTodoListTitleAT => ({type: "CHANGE-TODOLIST-TITLE", title: title, todolistId: todolistId })
