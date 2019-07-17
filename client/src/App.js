import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import {applyMiddleware,createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './Reducers';
import {Provider}  from 'react-redux';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import HomeUsers from "./Components/Home.Users";
import FollowChart from "./Components/Chart";

const store = createStore(rootReducer,applyMiddleware(thunk));

class App extends React.Component{

    render() {return (<Router>
            <Provider store={store}>
                <Route path="/login" component={Login}/>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/home" component={HomeUsers}/>
                <Route path="/chart" component={FollowChart}/>
            </Provider>
        </Router>)}
}


export default App
