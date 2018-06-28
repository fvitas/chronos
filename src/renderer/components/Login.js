import React, { Component } from 'react'
import '../App.styl'

import { getUserCredentials, saveTokens } from '../indexeddb/indexeddbApi'
import { logInWithGoogle, setAuthTokens } from '../google/googleApi'

class Login extends Component {
    login = async () => {
        let credentials = await getUserCredentials()
        let tokens = await logInWithGoogle(credentials)

        setAuthTokens(tokens)
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

export { Login }
