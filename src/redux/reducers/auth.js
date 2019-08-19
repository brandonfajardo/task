import {
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_IN,
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
} from "../actions/types";

    const initialState = {
        signingUp: null,
        signUpSuccessMessage: null,
        signUpFailMessage: null,
        signingIn: null,
        signInErrorMessage: null,
        profile: null,
    }
  
  export default (state = initialState, action) => {
    switch(action.type){
        case SIGN_UP:
            return {
                ...state,
                signingUp: true,
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                signingUp: false,
                signUpSuccessMessage: action.payload,
                signUpFailMessage: null,
            }
        case SIGN_UP_FAIL:
            return {
                ...state,
                signingUp: false,
                signUpFailMessage: action.payload,
                signUpSuccessMessage: null,
            }
        case SIGN_IN:
            return {
                ...state,
                signingIn: true,
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                signingIn: null,
                signInErrorMessage: null,
            }
        case SIGN_IN_FAIL:
            return {
                ...state,
                signingIn: null,
                signInErrorMessage: action.payload,
            }
        default: return state
    }
  }