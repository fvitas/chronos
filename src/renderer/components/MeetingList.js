import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('meetingStore')
@observer
class MeetingList extends Component {

    formatTime (time) {
        let hours = time.getHours()
        let minutes = time.getMinutes()

        if (minutes < 10)
            minutes = '0' + minutes

        return `${hours}:${minutes}`
    }

    render() {
        let meetings = this.props.meetingStore.meetings

        return (
                <div className='meeting-wrapper'>
                    {
                        meetings.map(meeting => {
                            let startTime = this.formatTime(new Date(meeting.start.dateTime))
                            let endTime = this.formatTime(new Date(meeting.end.dateTime))

                            return (
                                <div className='meeting-item' key={meeting.id}>
                                    <div>{ `${startTime}-${endTime}` }</div>
                                    <a href={ meeting.htmlLink }>meeting.summary</a>
                                </div>
                            )
                        })
                    }
                </div>
        )
    }
}

export { MeetingList }
