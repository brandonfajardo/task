import React from 'react'
import { H2, SmallText } from '../../../../styles/fonts'
import { TextArea, Label, Select } from '../../../../styles/elements'
import { Button } from '../../../../styles/elements'
import isEmpty from 'lodash/isEmpty'
import { createTask } from '../../../../redux/actions/task'
import { connect } from 'react-redux'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import isEqual from 'lodash/isEqual'

class CreateTaskForm extends React.Component {
    state = {
        description: '',
        priority: 'low',
        error: null,
    }

    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    createTask = () => {
        const { description, priority } = this.state
        const email = get(this.props, 'profile.email')

        this.setState({ error: null })

        let unique = true

        this.props.tasks.forEach(task => {
            if (isEqual(task.description, description)) {
                unique = false
            }
        })
        
        if (isEqual(unique, false)) {
            this.setState({ error: 'A task with that description already exists' })
        } else {
            this.props.createTask(email, description, priority)
        }
    }

    render() {
        const { 
            description,
            priority,
            error,
        } = this.state
        const { 
            creatingTask,
            createTaskSuccessMessage,
            createTaskFailMessage,
        } = this.props
        const isValid = !isEmpty(description)
        return (
            <div>
                <H2 center={true}>Create a task</H2>
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

                {!isNil(createTaskSuccessMessage) && <SmallText success={true}>{createTaskSuccessMessage}</SmallText>}
                {!isNil(createTaskFailMessage) && <SmallText error={true}>{createTaskFailMessage}</SmallText>}
                {!isNil(error) && <SmallText error={true}>{error}</SmallText>}

                <Button onClick={this.createTask} disabled={!isValid || creatingTask} width={`100%`}>Create</Button>
            </div>
        )
    }
}

const mapStateToProps = ({ task }) => ({
    creatingTask: task.creatingTask,
    createTaskSuccessMessage: task.createTaskSuccessMessage,
    createTaskFailMessage: task.createTaskFailMessage,
    tasks: task.tasks,
})

const mapDispatchToProps = {
    createTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm)