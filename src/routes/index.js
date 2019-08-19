import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import history from './history'
import Login from '../pages/auth/Login'
import TaskList from '../pages/task/TaskList'
import PublicRouteCurry from './publicRoute'
import PrivateRouteCurry from './privateRoute'
import { NavBar } from '../components'
import { dbAuth } from '../firebase'
import isEqual from 'lodash/isEqual'
import Reroute from './Reroute'

class AppRoutes extends React.Component {
    state = {
        loading: true,
        isLoggedIn: null,
        profile: null,
    }

    componentDidMount () {
        this.authListener()
    }

    authListener = () => {
        dbAuth.onAuthStateChanged(user => {
          if (user) {
            this.setState({ isLoggedIn: true, loading: false , profile: user }, () => {
                history.push('/tasks')
            })
          } else {
            this.setState({ isLoggedIn: false, loading: false, profile: null })
          }
        })
    }

    render() {
        const { loading } = this.props
        const { isLoggedIn } = this.state

        const PublicRoute = PublicRouteCurry(history, this.state)
        const PrivateRoute = PrivateRouteCurry(history, this.state)

        if (isEqual(loading, true)) return null
        
        return (
            <div>
                {isEqual(isLoggedIn, true) && <NavBar history={history} {...this.state } />}
                <Router history={history}>
                    <Switch>
                        <PublicRoute path='/login' exact={true} component={Login} />
                        <PrivateRoute path='/tasks' exact={true} component={TaskList} />
                        <Route path='*' exact={true} component={props => <Reroute {...props} {...this.state} />} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default AppRoutes