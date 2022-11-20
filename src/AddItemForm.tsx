import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleTwoTone} from "@material-ui/icons";
import './App.css'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

//УНИВЕРСАЛЬНЫЙ Input -----------
export const AddItemForm = (props: AddItemFormPropsType) => {
    //1. когда пользователь что-то печатает это добавляется
    //local state для хранения ввода до нажатия кнопки
    const [title, setTitle] = useState<string>('')
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false); {/*когда после ошибки пользователь начинает вводить, ошибка исчезает*/}
        setTitle(e.currentTarget.value)
    }

    //2. Хранение и вывод ошибки
    const [error, setError] = useState<boolean>(false)
    // const errorMessage = error ? <div style={{fontWeight: "bold", color: "hotpink"}}>Title is required!</div>: null //вывод сообщения об ошибке

    //3. При нажатии на кнопку или enter добавляется Item
    const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem()
    const addItem = () => {
        const trimmedTitle = title.trim()// удаляет пробелы из начала и конца строки
        // если при вводе есть данные то добавляет Item, если нет данных то передает в setError true
        if(trimmedTitle !== ''){
            // добавление Item(task или лист) с указанным названием
            props.addItem(trimmedTitle)
        } else {
            setError(true) //вывод ошибки, если нет ошибки =null, элемент не создаст
        }
        setTitle('')
    }


    return (
        <div>
            {/*<input*/}
            {/*    value={title}*/}
            {/*    onChange={onChangeSetLocalTitle}*/}
            {/*    onKeyDown={onEnterDownAddItem}*/}
            {/*    className={error ? 'error' : ''} // обработка error*/}
            {/*/>*/}
            <TextField
                label={'Add'}
                variant={'outlined'}
                size={'small'}
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onEnterDownAddItem}
                // className={error ? 'error' : ''} // обработка error
                error={error}
                helperText={error && 'Title is required!'}
                className={'addItem'}
            />
            <IconButton onClick= {addItem} color={'default'}><AddCircleTwoTone/></IconButton>
            {/*вывод сообщения при ошибке*/}
            {/*errorMessage*/}
        </div>
    )
};

export default AddItemForm;