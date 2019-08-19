import React from 'react'
import { H2, SmallText } from '../../../../styles/fonts'
import { TextInput, Button } from '../../../../styles/elements'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import { signUp } from '../../../../redux/actions/auth'
import { connect } from 'react-redux'

class SignupForm extends React.Component {
    state = {
        email: '',
        password: '',
        fieldError: null,
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    signUp = () => {
        const { email, password } = this.state
        const { signUp } = this.props

        if (isEmpty(email) && isEmpty(password)) {
            this.setState({
                fieldError: 'Email and password cannot be left blank'
            })
        } else {
            this.setState({ fieldError: null })
            signUp(email, password)
        }
    }

    render() {
        const { email, password, fieldError } = this.state
        const { signUpFailMessage, signUpSuccessMessage, signingUp } = this.props
        return (
            <div>
                <H2 center={true}>Sign Up</H2>
                <TextInput
                    value={email}
                    name='email'
                    onChange={this.onInputChange}
                    type='text' 
                    width={`100%`}
                    placeholder='Enter email...' />
                <TextInput
                    value={password}
                    onChange={this.onInputChange}
                    name='password'
                    type='password'
                    width={`100%`}
                    placeholder='Enter password...' />
                
                {!isNil(fieldError) && <SmallText error={true}>{fieldError}</SmallText>}
                {!isNil(signUpFailMessage) && <SmallText error={true}>{signUpFailMessage}</SmallText>}
                {!isNil(signUpSuccessMessage) && <SmallText success={true}>{signUpSuccessMessage}</SmallText>}

                <Button disabled={signingUp} onClick={this.signUp} width={`100%`}>Create</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    signUpFailMessage: auth.signUpFailMessage,
    signUpSuccessMessage: auth.signUpSuccessMessage,
    signingUp: auth.signingUp,
})

const mapDispatchToProps = {
    signUp,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)