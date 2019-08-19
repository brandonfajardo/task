import styled from 'styled-components'
import { error } from '../../../../../styles/colours'

export const Trash = styled.i`
    cursor: pointer;
    font-size: 20px;
    margin-top: 10px;
    &:hover {
        color: ${error};
    };
`