import React, { Component } from 'react'
import '../App.styl'

import { getMeetings } from '../google/googleApi'

class Calendar extends Component {

    getMeetings = async () => {
        let meetings = await getMeetings()

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
