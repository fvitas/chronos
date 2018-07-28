import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import './preferences.styl'

import { Checkbox } from './components/Checkbox'

const CONTROLS = { BUTTON: 'button', CHECKBOX: 'checkbox' }

class App extends Component {
    constructor() {
        super()

        this.preferences = [
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
                buttonLabel: 'logout',
                action: this.logoutUser
            },
            {
                title: 'Delete Google Client',
                description: 'Delete Client ID, this will delete user data',
                type: CONTROLS.BUTTON,
                buttonLabel: 'delete client',
                action: this.deleteGoogleClient
            }
        ]
    }

    logoutUser = () => {
        // calendar window is always first window
        let calendarWindow = nodeRequire('electron').remote.webContents.fromId(1)
        calendarWindow.send('delete-user-token')
    }

    deleteGoogleClient = () => {
        let calendarWindow = nodeRequire('electron').remote.webContents.fromId(1)
        calendarWindow.send('delete-client-credentials')
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
                                    else if (p.type === CONTROLS.BUTTON)    <button className='btn btn__error' onClick={p.action}>{ p.buttonLabel }</button>
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
