import React from 'react'
import { TaskContainer, ListContainer } from './styles'
import Task from './Task'
import { H4, P, SmallText } from '../../../styles/fonts'
import { Dot, DotWrapper } from '../../../styles/animation'
import { Flex } from '../../../styles/layout'
import { Container } from 'styled-bootstrap-grid'
import isEqual from 'lodash/isEqual'
import { Modal } from '../../../components'
import CreateTaskForm from './CreateTaskForm'
import { 
    fetchTasks,
    clearCreateTaskModal,
    clearEditTaskModal
} from '../../../redux/actions/task'
import { connect } from 'react-redux'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

class TaskList extends React.Component {
    state = {
        displayCreateTaskModal: false,
    }

    componentDidMount() {
        this.fetchTasks()
    }

    fetchTasks = () => {
        const email = get(this.props, 'profile.email')
        this.props.fetchTasks(email)
    }

    toggleCreateTaskModal = () => {
        this.props.clearCreateTaskModal()
        this.setState({ displayCreateTaskModal: !this.state.displayCreateTaskModal })
    }

    separateTask = tasks => {
        let lowPriorityTasks = []
        let mediumPriorityTasks = []
        let highPriorityTasks = []

        tasks.forEach(task => {
            if (isEqual(task.priority, 'low')) lowPriorityTasks.push(task)
            if (isEqual(task.priority, 'medium')) mediumPriorityTasks.push(task)
            if (isEqual(task.priority, 'high')) highPriorityTasks.push(task)
        })

        return {
            lowPriorityTasks,
            mediumPriorityTasks,
            highPriorityTasks
        }
    }

    render() {
        const { displayCreateTaskModal } = this.state
        const { loadingTask, tasks } = this.props

        const { lowPriorityTasks, mediumPriorityTasks, highPriorityTasks } = this.separateTask(tasks)

        return (
            <TaskContainer>
                {isEqual(displayCreateTaskModal, true) && (
                    <Modal closeAction={this.toggleCreateTaskModal}>
                        <CreateTaskForm {...this.props} />
                    </Modal>
                )}

                <Container>
                    <H4 
                        style={{ margin: '0px' }}
                        click={true}
                        onClick={this.toggleCreateTaskModal}
                        white={true}>+ Create a task</H4>
                    
                    {isEqual(loadingTask, true)
                        ? <DotWrapper>
                            <Dot delay={'0s'} />
                            <Dot delay={'.1s'} />
                            <Dot delay={'.2s'} />
                        </DotWrapper>
                        : !isEmpty(tasks)
                            ? <Flex justifyCenter={true} style={{ marginTop: '50px' }}>
                                <ListContainer>
                                    {!isEmpty(lowPriorityTasks)
                                        ? lowPriorityTasks.map((task, i) => (
                                            <Task {...this.props} {...task} key={`low--${i}`} />
                                        ))
                                        : <SmallText>No low priority tasks...</SmallText>
                                    }
                                </ListContainer>
                                <ListContainer>
                                    {!isEmpty(mediumPriorityTasks)
                                        ? mediumPriorityTasks.map((task, i) => (
                                            <Task {...this.props} {...task} key={`medium--${i}`} />
                                        ))
                                        : <SmallText>No medium priority tasks...</SmallText>
                                    }
                                </ListContainer>
                                <ListContainer>
                                    {!isEmpty(highPriorityTasks)
                                        ? highPriorityTasks.map((task, i) => (
                                            <Task {...this.props} {...task} key={`high--${i}`}/>
                                        ))
                                        : <SmallText>No high priority tasks...</SmallText>
                                    }
                                </ListContainer>
                            </Flex>
                            : <P white={true} center={true}>No tasks found...</P>
                    }
                </Container>
            </TaskContainer>
        )
    }
}

const mapStateToProps = ({ task }) => ({
    loadingTask: task.loadingTask,
    tasks: task.tasks,
})

const mapDispatchToProps = {
    fetchTasks,
    clearCreateTaskModal,
    clearEditTaskModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)