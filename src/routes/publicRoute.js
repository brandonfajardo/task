import React from 'react'
import { Route } from 'react-router-dom'

const PublicRouteCurry = (history, state) => {
  return ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
            return <Component {...state} {...rest} {...props} />
        }} />
      )
    }
}

export default PublicRouteCurry