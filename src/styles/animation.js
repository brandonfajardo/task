import styled, { keyframes} from 'styled-components'
import { white } from './colours'

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 10px }
  100% { margin-bottom: 0 }
`

export const DotWrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-end;
`

export const Dot = styled.div`
  background-color: ${white};
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`