import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import _ from 'lodash'
import './App.styl'

import { initDB, getUserCredentials, saveUserCredentials, saveTokens, getTokens } from './indexeddb/indexeddbApi'
import { logInWithGoogle } from './auth/auth'

initDB()

class Protected extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <h1 className='App-title'>Protected view</h1>
                </header>
            </div>
        )
    }
}

class AuthClient extends Component {
    state = {
        fileRejected: false
    }

    onDrop = async (acceptedArray) => {
        let file = acceptedArray[0]

        if (_.isEmpty(acceptedArray) || !_.endsWith(file.name, 'json')) {
            this.setState({ fileRejected: true })
            return
        }

        this.setState({ fileRejected: false })

        let fileContent = nodeRequire('fs').readFileSync(file.path)
        let credentials = JSON.parse(fileContent)

        await saveUserCredentials(credentials)
        this.props.onClientActivation()
    }

    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <h1 className='App-title'>Welcome to Chronos</h1>
                </header>

                <ol className='instructions'>
                    <li><a className='configure-link' href='https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin'>Configure a project</a></li>
                    <li>Create Credentials, create OAuth Client, choose "Other" as the application type</li>
                    <li>Enable Google Calendar API</li>
                </ol>

                <Dropzone className='Dropzone-container' accept='application/json, .json' multiple={false} onDrop={this.onDrop}>

                    <p>Drop credentials.json here, or select file to upload.</p>

                    { this.state.fileRejected && <p className='rejected-message'>Upload correct JSON file</p> }

                </Dropzone>
            </div>
        )
    }
}

class Login extends Component {
    login = async () => {
        let credentials = await getUserCredentials()
        let tokens = await logInWithGoogle(credentials)

        await saveTokens(tokens)

        this.props.onLogin()
    }

    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <h1 className='App-title'>Welcome to Chronos</h1>
                </header>
                <p>You should login with google account</p>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}

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
                else                                    <Protected/>
            }
        )
    }
}

export default App
