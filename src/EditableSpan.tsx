import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

//РЕДАКТИРУЕМАЯ СТРОКА---------------
const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    //включить редактирование
    const onEditMode = () => {
        setIsEditMode(true)
    }

    //выключить редактирование
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title) //передает в родительский элемент title
    }
    return (
        isEditMode
        ?<input
            value={title}
            autoFocus
            onBlur={offEditMode} /*если пользователь клик вне input, то отключается редактирование*/
            onChange={onChangeSetLocalTitle}
            /> /**/
        :<span onDoubleClick={onEditMode}>{props.title}</span> /*двойное нажатие - появится input*/
    );
};

export default EditableSpan;