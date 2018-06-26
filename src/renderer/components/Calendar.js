import React, { Component } from 'react'
import '../App.styl'

import { getMeetings } from '../google/googleApi'
import { getTokens } from '../indexeddb/indexeddbApi'

class Calendar extends Component {

    getMeetings = async () => {
        let tokens = await getTokens()
        let meetings = await getMeetings(tokens)

        console.log(meetings)
    }

    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <h1 className='App-title'>Protected view</h1>
                </header>
                <button onClick={this.getMeetings}>get meetings</button>
            </div>
        )
    }
}

export { Calendar }
