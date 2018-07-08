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

    render() {
        let { dateStore } = this.props

        return (
            <Fragment>
                <header className='App-header'>
                    <svg viewBox='0 0 50 80' width='20px' height='20px' className='left' onClick={this.previousMonth}>
                        <path fill='none' stroke='#FFF' d='M45.63 75.8L.375 38.087 45.63.375' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>

                    <h3 style={{display: 'inline-block', userSelect: 'none'}}>
                        <div>{dateStore.date.getFullYear()}</div>
                        <div style={{display: 'block', width: '100px'}}>{this.months[dateStore.date.getMonth()]}</div>
                    </h3>

                    <svg viewBox='0 0 50 80' width='20px' height='20px' className='right' onClick={this.nextMonth}>
                        <path fill='none' stroke='#FFF' d='M.375.375L45.63 38.087.375 75.8' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                </header>
            </Fragment>
        )
    }
}

export { CalendarNavigation }
