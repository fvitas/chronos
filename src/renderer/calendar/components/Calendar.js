import React, { Component } from 'react'
import '../App.styl'

import { CalendarNavigation } from './CalendarNavigation'
import { CalendarData } from './CalendarData'
import { MeetingList } from './MeetingList'

class Calendar extends Component {

    render() {
        return (
            <div className='App'>
                <CalendarNavigation />

                <CalendarData />

                <MeetingList />
            </div>
        )
    }
}

export { Calendar }
