import React from 'react';
import ReactDOM from 'react-dom'; // (The Document Object Model)
import './index.css'; // Подключили стили
import * as serviceWorker from './serviceWorker'; // Это для работы в условиях потери сети
import {ThemeProvider} from "@material-ui/core"; // Themes
import {createTheme} from '@material-ui/core/styles';
import {teal, yellow} from "@material-ui/core/colors";
import {Provider} from "react-redux";
import {store} from "./store/store";
import AppWithRedux from "./AppWithRedux";

const theme = createTheme({
    palette: {
        primary: teal,
        secondary: yellow,
        type: "dark"
    }
})

// DOM Реакта отрисует <App />
ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppWithRedux/>
    </ThemeProvider>
    </Provider> , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();