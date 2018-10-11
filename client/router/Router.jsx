import React from 'react';
import { BrowserRouter, Route, Switch, browserHistory } from 'react-router-dom';

import Main from '../views/main/Main.jsx';
import Info from '../views/info/Info.jsx';


function Router () {
    return (
        <BrowserRouter history={browserHistory}>
            <Switch>
                <Route path="/" component={Main} exact={true}/>
                <Route path="/info" component={Info} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;