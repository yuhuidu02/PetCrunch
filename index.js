import React from "react";
import { AppRegistry } from "react-native";
//import Header from "./src/components/Header";
import MainApp from "./src/App.js";
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './src/reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

// const App = () => {
//     //return <Header title="PetCrunch" />
//     return <MainApp />
// };

const App = () => (
    <Provider store={store}>
        <MainApp />
    </Provider>
);

AppRegistry.registerComponent("petclient", () => App);