import React, { Component } from 'react'
import './App.styl'
import idb from 'idb'

async function getUserCredentials() {
    let db = await idb.open('user', 1)

    let tx = db.transaction('credentials', 'readonly')
    let store = tx.objectStore('credentials')

    let allSavedItems = await store.get(33)
}

async function putUserCredentials() {
    let db = await idb.open('user', 1, upgradeDB => upgradeDB.createObjectStore('credentials', { keyPath : 'age' }))

    let tx = db.transaction('credentials', 'readwrite')
    let store = tx.objectStore('credentials')

    await store.put({ firstname: 'John', lastname: 'Doe', age: 33 })

    await tx.complete
    db.close()
}


async function authenticate(cb) {
    // let credentials = await getUserCredentials()
    // console.log(credentials)

    setTimeout(cb, 1000)
}

class Protected extends Component {
    render() {
        return <div>this is protected</div>
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
    state = {
        isAuthenticated: false
    }

    onLogin = () => {
        this.setState({ isAuthenticated: true })
    }

    render() {
        return (
            do {
                if (this.state.isAuthenticated) <Protected/>
                else <Login onLogin={this.onLogin}/>
            }
        )
    }
}

export default App
