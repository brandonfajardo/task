import React from 'react'
import { H2, SmallText } from '../../../../../styles/fonts'
import { 
    Label,
    TextArea,
    Select,
    Button
} from '../../../../../styles/elements'
import { Trash } from './styles'
import { 
    updateTask,
    deleteTask,
} from '../../../../../redux/actions/task'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import isEqual from 'lodash/isEqual'

class TaskEditForm extends React.Component {
    state = {
        priority: this.props.priority,
        description: this.props.description,
        error: null,
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateTask = () => {
        const { updateTask, _id, description: initialDescription } = this.props
        const { priority, description } = this.state

        this.setState({ error: null })
        
        let unique = true

        this.props.tasks.forEach(task => {
            if (isEqual(task.description, description)) {
                unique = false
            }
        })
        
        if (!isEqual(description, initialDescription) && isEqual(unique, false)) {
            this.setState({ error: 'A task with that description already exists' })
        } else {
            updateTask(_id, priority, description)
        }
    }

    deleteTask = () => {
        const { _id, deleteTask, toggleEditForm } = this.props
        toggleEditForm()
        deleteTask(_id)
    }

    render() {
        const { priority, description, error } = this.state
        const { updatingTask, updateTaskFailMessage, updateTaskSuccessMessage } = this.props

        const isValid = !isEmpty(description)
        return (
            <div>
                <Trash onClick={this.deleteTask} className='fa fa-trash-alt' />
                <H2 center={true}>Edit</H2>
                <Label>Description</Label>
                <TextArea
                    name='description'
                    placeholder='Enter description...'
                    value={description}
                    onChange={this.onInputChange}
                />

                <Label>Priority</Label>
                <Select name='priority' value={priority} onChange={this.onInputChange}>
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                </Select>

                {!isNil(error) && <SmallText error={true}>{error}</SmallText>}
                {!isNil(updateTaskFailMessage) && <SmallText error={true}>{updateTaskFailMessage}</SmallText>}
                {!isNil(updateTaskSuccessMessage) && <SmallText success={true}>{updateTaskSuccessMessage}</SmallText>}
                
                <Button disabled={!isValid || updatingTask} style={{ marginBottom: '10px' }} onClick={this.updateTask} width={`100%`}>Save</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ task }) => ({
    task: task.updatingTask,
    updatingTask: task.updatingTask,
    updateTaskFailMessage: task.updateTaskFailMessage,
    updateTaskSuccessMessage: task.updateTaskSuccessMessage,
    tasks: task.tasks,
})

const mapDispatchToProps = {
    updateTask,
    deleteTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditForm)