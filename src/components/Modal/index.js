import React from 'react'
import { ModalContainer, ModalOverlay, DialogueBox } from './styles'

const Modal = ({ style, children, closeAction }) => {
  return (
    <ModalContainer>
      <DialogueBox style={style}>
        {children}
      </DialogueBox>
      <ModalOverlay onClick={() => closeAction()}/>
    </ModalContainer>
  )
}

export default Modal