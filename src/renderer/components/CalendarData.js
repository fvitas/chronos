import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'

function modulo(value, modulus) {
    return (value % modulus + modulus) % modulus
}

@inject('dateStore')
@observer
class CalendarData extends Component {

    dayOfWeeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    initCalendarData(date) {
        let month = date.getMonth()
        let year = date.getFullYear()

        // Because of February
        if (month === 1) {
            this.noOfDaysInMonth[1] = ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28
        }

        return this.generateCalendar(year, month)
    }

    generateCalendar(year, month) {
        let firstDayInCurrentMonth = new Date(year, month, 1)
        let firstDayPositionInWeek = modulo(firstDayInCurrentMonth.getDay() - 1, 7)  // Sunday is 0

        let currentMonth = new Array(42)

        // populatePreviousMonth
        for (let i = firstDayPositionInWeek - 1; i > -1; i--) {
            currentMonth[i] = this.noOfDaysInMonth[modulo(month - 1, 12)] - (firstDayPositionInWeek - i - 1)
        }

        let dayCounter = 1
        let lastDay

        // populate current month
        for (let day = firstDayPositionInWeek; day < firstDayPositionInWeek + this.noOfDaysInMonth[month]; day++) {
            lastDay = day
            currentMonth[day] = dayCounter++
        }

        dayCounter = 1

        // populate next month
        for (let day = lastDay + 1; day < currentMonth.length; day++) {
            currentMonth[day] = dayCounter++
        }

        this.currentMonthStart = firstDayPositionInWeek
        this.currentMonthEnd = lastDay

        return currentMonth
    }

    onDayClick(day, event) {
        let { dateStore } = this.props

        let monthDifference = 0

        if (event.currentTarget.className.includes('prev-month')) {
            monthDifference = -1
        }

        if (event.currentTarget.className.includes('next-month')) {
            monthDifference = +1
        }

        dateStore.selectDate(dateStore.date.getFullYear(), dateStore.date.getMonth() + monthDifference, day)
    }

    render() {
        let currentDate = this.props.dateStore.date
        let dateCalendar = this.initCalendarData(currentDate)

        return (
            <Fragment>
                <div>{currentDate.toLocaleString()}</div>

                <div className='calendar'>
                    <div className='days-of-week'>
                        {this.dayOfWeeks.map(dayLabel => <div key={dayLabel}>{dayLabel}</div>)}
                    </div>

                    <div className='days'>
                        {
                            dateCalendar.map((day, dayIndex) => {
                                let className = ''

                                if (dayIndex < this.currentMonthStart) {
                                    className = 'prev-month'
                                } else if (dayIndex > this.currentMonthEnd) {
                                    className = 'next-month'
                                } else if (day === currentDate.getDate()) {
                                    className = 'current-day'
                                }

                                return (
                                    <div className={className} key={dayIndex} onClick={this.onDayClick.bind(this, day)}>
                                        <span>{day}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}

export { CalendarData }
