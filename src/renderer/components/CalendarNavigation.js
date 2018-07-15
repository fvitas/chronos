import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'

@inject('dateStore')
@observer
class CalendarNavigation extends Component {

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    previousMonth = () => {
        this.props.dateStore.decreaseMonth()
    }

    nextMonth = () => {
        this.props.dateStore.increaseMonth()
    }

    changeMonth = (event) => {
        let currentDate = this.props.dateStore.date

        this.props.dateStore.selectDate(currentDate.getFullYear(), event.target.id.split('opt')[1], currentDate.getDate())
    }

    onToday = () => {
        this.props.dateStore.goToToday()
    }

    render() {
        let { date } = this.props.dateStore

        return (
            <Fragment>
                <header className='App-header'>
                    <span>{date.getFullYear()}</span>
                    <div className="select" tabIndex="1">
                        {
                            this.months.map((month, index) => (
                                <Fragment key={'opt' + index}>
                                    <input name='test' type='radio' id={'opt' + index} checked={index === date.getMonth()} onChange={this.changeMonth}/>
                                    <label className='option' htmlFor={'opt' + index}>{month}</label>
                                </Fragment>
                            ))
                        }
                    </div>

                    <button className='today' onClick={this.onToday}>Today</button>

                    <svg viewBox='0 0 50 80' width='20px' height='20px' className='left' onClick={this.previousMonth}>
                        <path fill='none' stroke='#FFF' d='M45.63 75.8L.375 38.087 45.63.375' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                    <svg viewBox='0 0 50 80' width='20px' height='20px' className='right' onClick={this.nextMonth}>
                        <path fill='none' stroke='#FFF' d='M.375.375L45.63 38.087.375 75.8' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                </header>
            </Fragment>
        )
    }
}

export { CalendarNavigation }
