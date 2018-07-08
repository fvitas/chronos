import React, { Component } from 'react'
import '../App.styl'
// import { getMeetings } from '../google/googleApi'
import { CalendarNavigation } from './CalendarNavigation'
import { CalendarData } from './CalendarData'

class Calendar extends Component {

    // getMeetings = async () => {
    //     let meetings = await getMeetings()
    //
    //     console.log(meetings)
    // }

    render() {
        return (
            <div className='App'>
                <CalendarNavigation />

                <CalendarData />

                {/*<MeetingList />*/}

            </div>
        )
    }
}

export { Calendar }
