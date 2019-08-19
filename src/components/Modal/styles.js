import styled from 'styled-components'
import { white, overlay } from '../../styles/colours'

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
`

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${overlay};
`

export const DialogueBox = styled.div`
  overflow: hidden;
  width: 300px;
  background-color: ${white};
  z-index: 999999;
  padding: 20px 40px;
  border-radius: 8px;
`