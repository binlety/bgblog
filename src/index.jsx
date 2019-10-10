
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Link,Switch} from 'react-router-dom'
import {observer,Provider} from 'mobx-react'
import BlogHome from 'page/BlogHome/index.jsx'
import Login from 'page/Login/index.jsx'
import Register from 'page/Register/index.jsx'
import Forbidden from 'component/Forbidden/index.jsx'
import * as Store from 'store/index.js'
import './index.less'

@observer
 class Website extends React.Component{
    render() {
        return (
            <Provider {...Store}>
                <Router>
                    <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/home" component={BlogHome}></Route>
                    <Route path="*" component={Forbidden}></Route>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Website />, document.getElementById('blog'));
