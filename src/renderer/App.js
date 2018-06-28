import React, { Component } from 'react'

import { AuthClient } from './components/AuthClient'
import { Calendar } from './components/Calendar'
import { Login } from './components/Login'

import { initDB, getUserCredentials, getTokens } from './indexeddb/indexeddbApi'
import { initAuthClient, setAuthTokens } from './google/googleApi'

(async () => {
    await initDB()

    let credentials = await getUserCredentials()
    let tokens = await getTokens()

    initAuthClient(credentials)
    setAuthTokens(tokens)
})()

class App extends Component {

    state = {
        isAuthenticated: false,
        isClientEnabled: false,
        pauseRender: true
    }

    async componentDidMount () {
        let newState = {
            isAuthenticated: !!await getTokens(),
            isClientEnabled: !!await getUserCredentials(),
            pauseRender: false
        }

        this.setState(newState)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !nextState.pauseRender
    }

    onClientActivation = () => {
        this.setState({ isClientEnabled: true })
    }

    onLogin = () => {
        this.setState({ isAuthenticated: true })
    }

    render() {
        if (this.state.pauseRender) return null

        return (
            do {
                if (!this.state.isClientEnabled)        <AuthClient onClientActivation={this.onClientActivation}/>
                else if (!this.state.isAuthenticated)   <Login onLogin={this.onLogin}/>
                else                                    <Calendar/>
            }
        )
    }
}

export default App
