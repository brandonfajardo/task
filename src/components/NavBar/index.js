import React from 'react'
import { NavContainer } from './styles'
import { H2, SmallText } from '../../styles/fonts'
import { Flex } from '../../styles/layout'
import { dbAuth } from '../../firebase'

class NavBar extends React.Component {
    logOut = () => {
        this.props.history.push('/login')
        dbAuth.signOut()
    }

    render () {
        return (
            <NavContainer>
                <Flex spaceBetween={true}>
                    <H2 bold={true} white={true}>Trelloh</H2>
                    <Flex column={true} justifyCenter={true}>
                        <SmallText white={true} click={true} onClick={this.logOut}>Log Out</SmallText>
                    </Flex>
                </Flex>
            </NavContainer>
        )
    }
}

export default NavBar