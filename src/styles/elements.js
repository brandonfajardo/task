import styled from 'styled-components'
import { lightGray, black } from './colours'

export const TextInput = styled.input`
    display: block;
    border: 1px solid ${lightGray};
    border-radius: 4px;
    outline: none;
    padding: 15px 10px;
    margin-bottom: 10px;
    width: ${props => props.width};
`

export const Button = styled.button`
   ${props => props.disabled && `
        opacity: 0.7;
        cursor: none;
   `};
   width: ${props => props.width};
   padding: 10px;
   background: ${black};
   color: white;
   font-size: 16px;
   outline: none;
   cursor: pointer;
`

export const TextArea = styled.textarea`
    padding: 15px 10px;
    outline: none;
    width: 100%;
    resize: none;
    height: 100px;
`

export const Label = styled.label`
    display: block;
    margin-bottom: 10px;
`

export const Select = styled.select`
    display: block;
    margin-bottom: 15px;
`