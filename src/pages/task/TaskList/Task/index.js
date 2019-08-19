import React from 'react'
import { TaskContainer, Priority } from './styles'
import { SmallText } from '../../../../styles/fonts'
import isEmpty from 'lodash/isEmpty'
import TaskEditForm from './TaskEditForm'
import isEqual from 'lodash/isEqual'
import { Modal } from '../../../../components'

class Task extends React.Component {
    state = {
        displayEditForm: false,
    }

    toggleEditForm = () => {
        this.props.clearEditTaskModal()
        this.setState({ displayEditForm: !this.state.displayEditForm })
    }

    render() {
        const { description, priority } = this.props
        const { displayEditForm } = this.state
        return (
            <div>
                {isEqual(displayEditForm, true) && (
                    <Modal closeAction={this.toggleEditForm}>
                        <TaskEditForm toggleEditForm={this.toggleEditForm} {...this.props} />
                    </Modal>
                )}
                <TaskContainer onClick={this.toggleEditForm}>
                    <Priority status={priority} />
                    {!isEmpty(description) && <SmallText style={{ marginTop: '30px' }}>{description}</SmallText>}
                </TaskContainer>
            </div>
        )
    }
}

export default Task