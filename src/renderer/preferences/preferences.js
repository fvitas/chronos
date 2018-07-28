import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { camelCase } from 'lodash-es'

import './preferences.styl'

import { Checkbox } from './components/Checkbox'

const CONTROLS = { BUTTON: 'button', CHECKBOX: 'checkbox' }

class App extends Component {
    preferences = [
        {
            title: 'Start automatically (not working)',
            description: 'Launch Chronos on system startup',
            type: CONTROLS.CHECKBOX
        },
        {
            title: 'Dark theme (not working)',
            description: 'Apply dark theme to calendar',
            type: CONTROLS.CHECKBOX
        },
        {
            title: 'Do Not Disturb (not working)',
            description: 'Ignore notifications and do your job',
            type: CONTROLS.CHECKBOX
        },
        {
            title: 'Always on top',
            description: 'Show Chronos on top of other applications',
            type: CONTROLS.CHECKBOX
        },
        {
            title: 'Keep in Dock (not working)',
            description: 'Show application icon inside Dock',
            type: CONTROLS.CHECKBOX
        },
        {
            title: 'Logout User',
            description: 'Delete google user data',
            type: CONTROLS.BUTTON,
            buttonLabel: 'logout'
        },
        {
            title: 'Delete Google Client',
            description: 'Delete Client ID, this will delete user data',
            type: CONTROLS.BUTTON,
            buttonLabel: 'delete client'
        }
    ]

    triggerAction = (event) => {

        if (event.target.dataset['action'] === 'logout') {
            let calendar = nodeRequire('electron').remote.webContents.fromId(1) // calendar window is always first window
            calendar.send('delete-user-token')
        }

        if (event.target.dataset['action'] === 'deleteClient') {
            let calendar = nodeRequire('electron').remote.webContents.fromId(1)
            calendar.send('delete-client-credentials')
        }
    }

    render() {
        return (
            <Fragment>
                {
                    this.preferences.map((p, i) => (
                        <div className='preference' key={i}>
                            <div className='preference-content'>
                                <div className='preference__title'>{ p.title }</div>
                                <div className='preference__description'>{ p.description }</div>
                            </div>
                            {
                                do {
                                    if (p.type === CONTROLS.CHECKBOX)       <Checkbox/>
                                    else if (p.type === CONTROLS.BUTTON)    <button className='btn btn__error' data-action={ camelCase(p.buttonLabel) } onClick={this.triggerAction}>{ p.buttonLabel }</button>
                                }
                            }
                        </div>
                    ))
                }
            </Fragment>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.preferences'))
