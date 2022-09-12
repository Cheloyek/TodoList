import React from 'react';
import ReactDOM from 'react-dom'; // (The Document Object Model)
import './index.css'; // Подключили стили
import App from './App';
import * as serviceWorker from './serviceWorker'; // Это для работы в условиях потери сети

// DOM Реакта отрисует <App />
ReactDOM.render(<App />,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
