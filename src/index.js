import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { combineReducers, createStore } from 'redux';

function reducerAlert(state = true, action){
  if(action.type === "close"){
    state = false;
    return state;
  }else{
    return state;
  }
}

let defaultValue = [
  {id:0, name : "Nike dunk", quan : 2}, 
  {id:1, name : "Adidas yeezy boost", quan : 4}
];

function reducer(state = defaultValue, action){
  if(action.type === "increase quan"){
    let newArr = [...state];
    newArr[0].quan++;
    return newArr;
  }else if(action.type === "decrease quan"){
    let newArr = [...state];
    if(newArr[0].quan === 0){
      return newArr
    }
    newArr[0].quan--;
    return newArr
  }else{
    return state;
  }
}

const store = createStore(combineReducers({reducer, reducerAlert}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
