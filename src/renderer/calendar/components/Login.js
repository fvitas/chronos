import React, { Component } from 'react'
import '../App.styl'

import { getClientCredentials, saveUserTokens } from '../indexeddb/indexeddbApi'
import { logInWithGoogle, setAuthTokens } from '../google/googleApi'

class Login extends Component {
    login = async () => {
        let credentials = await getClientCredentials()
        let tokens = await logInWithGoogle(credentials)

        setAuthTokens(tokens)
        await saveUserTokens(tokens)

        this.props.onLogin()
    }

    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <h1 className='App-title'>Welcome to Chronos</h1>
                </header>
                <button onClick={this.login}>Login with Google</button>
            </div>
        )
    }
}

export { Login }
