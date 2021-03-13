import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from "react-redux";
import store from "./shared/store/index";
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById("root");
const func = rootElement.hasChildNodes() ? hydrate : render;

func(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>, 
rootElement);


// ReactDOM.render(
//   // <React.StrictMode>
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   // </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
