import React from 'react'
import { TextInput, Button } from '../../../styles/elements'
import { H1, P, SmallText } from '../../../styles/fonts'
import { Flex } from '../../../styles/layout'
import { LoginContainer } from './styles'
import isEqual from 'lodash/isEqual'
import SignupForm from './SignupForm'
import { Modal } from '../../../components'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import { connect } from 'react-redux'
import { signIn } from '../../../redux/actions/auth'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        displaySignupModal: false,
        fieldError: null,
    }

    login = () => {
        const { email, password } = this.state
        const { signIn } = this.props

        if (isEmpty(email) && isEmpty(password)) {
            this.setState({
                fieldError: 'Email and password cannot be left blank'
            })
        } else {
            this.setState({ fieldError: null })
            signIn(email, password)
        }
    }

    toggleSignUp = () => {
        this.setState({
            displaySignupModal: !this.state.displaySignupModal,
        })
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { 
            email,
            password,
            displaySignupModal,
            fieldError,
        } = this.state
        const { 
            signingIn,
            signInErrorMessage,
        } = this.props
        return (
            <div>
                {isEqual(displaySignupModal, true) && (
                    <Modal closeAction={this.toggleSignUp}>
                        <SignupForm />
                    </Modal>
                )}

                <LoginContainer>
                    <Flex column={true}>
                        <H1 center={true}>Trelloh</H1>
                        <TextInput
                            name='email'
                            type='text'
                            placeholder='Email...'
                            value={email}
                            onChange={this.onInputChange} />
                        <TextInput
                            name='password'
                            type='password'
                            placeholder='Password...'
                            value={password}
                            onChange={this.onInputChange} />
                        
                        {!isNil(fieldError) && <SmallText error={true}>{fieldError}</SmallText>}
                        {!isNil(signInErrorMessage) && <SmallText error={true}>{signInErrorMessage}</SmallText>}

                        <Button disabled={signingIn} onClick={this.login}>Login</Button>
                        <P hover={true} onClick={this.toggleSignUp} click={true} right={true}>Need an account?</P>
                    </Flex>
                </LoginContainer>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    signingIn: auth.signingIn,
    signInErrorMessage: auth.signInErrorMessage,
})

const mapDispatchToProps = {
    signIn,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)