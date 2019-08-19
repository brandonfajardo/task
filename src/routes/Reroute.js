import React from 'react'
import { Redirect } from 'react-router-dom'
import isEqual from 'lodash/isEqual'

const Reroute = ({ isLoggedIn, loading }) => {
    if (isEqual(loading, false)) {
        if (isEqual(isLoggedIn, false)) {
            return <Redirect to='/login' />
        } else {
            return <Redirect to='/tasks' />
        }
    }
    return null
}

export default Reroute