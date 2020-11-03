import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import User from './components/User.jsx'

import NotFound from './components/notfound.jsx'
import Auth from './modules/Auth.js'
import Login from './components/login.jsx'



function checkAuth() {
    //console.log(Router.push("dashboard"));

}
ReactDOM.render((
     <Router>
         <Switch>
              <Route path="/contact" component={User} />
         </Switch>
         
         
        
      </Router>
     ),
     document.getElementById('app')
);