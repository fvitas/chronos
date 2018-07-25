import React, { Component } from 'react'

import { Provider } from 'mobx-react'
import { dateStore } from './state/DateStore'
import { meetingStore } from './state/MeetingStore'

import { AuthClient } from './components/AuthClient'
import { Calendar } from './components/Calendar'
import { Login } from './components/Login'

import { initDB, getClientCredentials, deleteClientCredentials, getUserTokens, deleteUserTokens } from './indexeddb/indexeddbApi'
import { getMeetings, initAuthClient, setAuthTokens } from './google/googleApi'

(async () => {
    await initDB()

    let credentials = await getClientCredentials()
    let tokens = await getUserTokens()

    if (credentials) {
        initAuthClient(credentials)
    }

    if (tokens) {
        setAuthTokens(tokens)
        meetingStore.meetings = await getMeetings(new Date())
    }
})()

class App extends Component {

    state = {
        isAuthenticated: false,
        isClientEnabled: false,
        pauseRender: true
    }

    async componentDidMount () {
        let newState = {
            isAuthenticated: !!await getUserTokens(),
            isClientEnabled: !!await getClientCredentials(),
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

    onLogin = async () => {
        this.setState({ isAuthenticated: true })

        meetingStore.meetings = await getMeetings(new Date())
    }

    render() {
        if (this.state.pauseRender) return null

        return (
            do {
                if (!this.state.isClientEnabled)        <AuthClient onClientActivation={this.onClientActivation}/>
                else if (!this.state.isAuthenticated)   <Login onLogin={this.onLogin}/>
                else                                    <Provider dateStore={dateStore} meetingStore={meetingStore}><Calendar/></Provider>
            }
        )
    }
}

const { ipcRenderer } = nodeRequire('electron')

ipcRenderer.on('delete-user-token', async (event) => {
    await deleteUserTokens()
    document.location.reload(false)
})

ipcRenderer.on('delete-client-credentials', async () => {
    await deleteUserTokens()
    await deleteClientCredentials()
    document.location.reload(false)
})

export default App
