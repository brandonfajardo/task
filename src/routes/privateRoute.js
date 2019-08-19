import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import isNil from 'lodash/isNil'

const PrivateRouteCurry = (history, state) => {
  return ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
            if (isNil(state.isLoggedIn)) return <Redirect to='/login' />
            if (isNil(state.profile)) return
            
            return <Component {...rest} {...state} {...props} />
        }} />
      )
    }
}

export default PrivateRouteCurry