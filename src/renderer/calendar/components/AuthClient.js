import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { isEmpty, endsWith } from 'lodash-es'
import '../App.styl'

import { saveClientCredentials } from '../indexeddb/indexeddbApi'

class AuthClient extends Component {
    state = {
        fileRejected: false
    }

    onDrop = async (acceptedArray) => {
        let file = acceptedArray[0]

        if (isEmpty(acceptedArray) || !endsWith(file.name, 'json')) {
            this.setState({ fileRejected: true })
            return
        }

        this.setState({ fileRejected: false })

        let fileContent = nodeRequire('fs').readFileSync(file.path)
        let credentials = JSON.parse(fileContent)

        await saveClientCredentials(credentials)
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

export { AuthClient }
