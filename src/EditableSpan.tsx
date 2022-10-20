import React, {useState} from 'react';

type EditableSpanPropsType = {
    title: string
}

//РЕДАКТИРУЕМАЯ СТРОКА---------------
const EditableSpan = (props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    //включить редактирование
    const onEditMode = () => {
        setIsEditMode(true)
    }

    //выключить редактирование
    const offEditMode = () => {
        setIsEditMode(false)
    }
    return (
        isEditMode
        ?<input
            value={props.title}
            autoFocus
            onBlur={offEditMode} /*если пользователь клик вне input, то отключается редактирование*/
            /> /**/
        :<span onDoubleClick={onEditMode}>{props.title}</span> /*двойное нажатие - появится input*/
    );
};

export default EditableSpan;