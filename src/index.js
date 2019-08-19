import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import store from './redux/store'
import { Provider } from 'react-redux'
import { BaseCSS } from 'styled-bootstrap-grid'

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BaseCSS /> {/* Neccessary for bootstrap grid */}
                <Routes />
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
