import { 
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_IN,
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
  } from './types'
import { dbAuth } from '../../firebase'

export const signIn = (email, password) => {
    return dispatch => {
        dispatch({ type: SIGN_IN  })

        dbAuth.signInWithEmailAndPassword(email, password)
          .then(() => dispatch({ type: SIGN_IN_SUCCESS }))
          .catch(e => {
            dispatch({ type: SIGN_IN_FAIL, payload: e.message })
          })
    }
}

export const signUp = (email, password) => {
    return dispatch => {
      dispatch({ type: SIGN_UP  })
  
      dbAuth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          dispatch({ type: SIGN_UP_SUCCESS, payload: `Success! Account ${email} has been created` })
        })
        .catch(e => {
          dispatch({ type: SIGN_UP_FAIL, payload: e.message })
        })
    }
  }
