import styled from 'styled-components'
import { white, red, yellow, orange } from '../../../../styles/colours'

export const TaskContainer = styled.div`
    display: block;
    background: ${white};
    margin-bottom: 15px;
    border-radius: 8px;
    padding: 15px;
    cursor: pointer;
    width: 100%;
`

export const Priority = styled.div`
    height: 16px;
    width: 16px;
    border-radius: 50%;
    position: absolute;
    top: 10;

    background: ${props => props.status === 'low' && yellow};
    background: ${props => props.status === 'medium' && orange};
    background: ${props => props.status === 'high' && red};
`