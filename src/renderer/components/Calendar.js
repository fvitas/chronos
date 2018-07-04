import React, { Component } from 'react'
import '../App.styl'
import { getMeetings } from '../google/googleApi'
import { dateStore } from '../state/DateStore'
import { CalendarNavigation } from './CalendarNavigation'

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

                <CalendarNavigation dateStore={dateStore}/>
            </div>
        )
    }
}

export { Calendar }
