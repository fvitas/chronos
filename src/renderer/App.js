import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import _ from 'lodash'
import './App.styl'
import idb from 'idb'

async function getUserCredentials() {
    let db = await idb.open('user', 1, upgradeDB => upgradeDB.createObjectStore('credentials', { keyPath: 'client_id' }))

    let tx = db.transaction('credentials', 'readonly')
    let store = tx.objectStore('credentials')

    let credentials = await store.getAll()

    return credentials[0]
}

async function saveUserCredentials(credentials) {
    let db = await idb.open('user', 1, upgradeDB => upgradeDB.createObjectStore('credentials', { keyPath: 'client_id' }))

    let tx = db.transaction('credentials', 'readwrite')
    let store = tx.objectStore('credentials')

    await store.put(credentials.installed)

    await tx.complete
    db.close()
}


async function authenticate(cb) {
    setTimeout(cb, 1000)
}

class Protected extends Component {
    render() {
        return <div>this is protected</div>
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

                <a className='configure-link' href='https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin'>Configure a project</a>

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
        await authenticate(this.props.onLogin)
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
    constructor() {
        super()
        this.state = {
            isAuthenticated: this.isAuthenticated(),
            isClientEnabled: this.isClientEnabled()
        }
    }

    isClientEnabled () {
        return false
    }

    isAuthenticated () {
        return false
    }

    async componentWillMount () {
        let isClientEnabled = !!await getUserCredentials()
        this.setState({ isClientEnabled: isClientEnabled })
    }

    onClientActivation = () => {
        this.setState({ isClientEnabled: true })
    }

    onLogin = () => {
        this.setState({ isAuthenticated: true })
    }

    render() {
        return (
            do {
                if (this.state.isClientEnabled && this.state.isAuthenticated) <Protected/>
                else if (!this.state.isClientEnabled) <AuthClient onClientActivation={this.onClientActivation}/>
                else if (!this.state.isAuthenticated) <Login onLogin={this.onLogin}/>
            }
        )
    }
}

export default App
