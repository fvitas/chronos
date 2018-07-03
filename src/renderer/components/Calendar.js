import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import '../App.styl'

import { getMeetings } from '../google/googleApi'

@observer
class Calendar extends Component {

    @observable
    count = 0

    getMeetings = async () => {
        let meetings = await getMeetings()

        console.log(meetings)
    }

    increment = () => {
        this.count++
    }

    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <h1 className='App-title'>Protected view</h1>
                </header>
                <button onClick={this.getMeetings}>get meetings</button>
                <button onClick={this.increment}>inc</button>
                { this.count }
            </div>
        )
    }
}

export { Calendar }
