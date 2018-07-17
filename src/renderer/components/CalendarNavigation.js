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
                    <svg viewBox='0 0 50 80' width='20px' height='20px' className='left' onClick={this.previousMonth}>
                        <path fill='none' stroke='#FFF' d='M45.63 75.8L.375 38.087 45.63.375' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>

                    <svg viewBox='0 0 50 80' width='20px' height='20px' className='right' onClick={this.nextMonth}>
                        <path fill='none' stroke='#FFF' d='M.375.375L45.63 38.087.375 75.8' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>

                    <span>{date.getFullYear()}</span>

                    <div className='select' tabIndex='1'>
                        {
                            this.months.map((month, index) => (
                                <Fragment key={'opt' + index}>
                                    <input name='test' type='radio' id={'opt' + index} checked={index === date.getMonth()} onChange={this.changeMonth}/>
                                    <label className='option' htmlFor={'opt' + index}>{month}</label>
                                </Fragment>
                            ))
                        }
                    </div>

                    <svg className='today' viewBox='0 0 448 512' width='22' fill='white' onClick={this.onToday}>
                        <path d='M 48 96 L 400 96 C 408.822 96 416 103.178 416 112 L 416 160 L 32 160 L 32 112 C 32 103.178 39.178 96 48 96 L 48 96 L 48 96 Z  M 400 64 L 352 64 L 352 12 C 352 5.373 346.627 0 340 0 L 332 0 C 325.373 0 320 5.373 320 12 L 320 64 L 128 64 L 128 12 C 128 5.373 122.627 0 116 0 L 108 0 C 101.373 0 96 5.373 96 12 L 96 64 L 48 64 C 21.49 64 0 85.49 0 112 L 0 464 C 0 490.51 21.49 512 48 512 L 400 512 C 426.51 512 448 490.51 448 464 L 448 112 C 448 85.49 426.51 64 400 64 L 400 64 L 400 64 Z  M 400 480 L 48 480 C 39.178 480 32 472.822 32 464 L 32 192 L 416 192 L 416 464 C 416 472.822 408.822 480 400 480 Z'/>
                        <text x='220' y='440' fill='white' fontSize='20em' textAnchor='middle'>{new Date().getDate()}</text>
                    </svg>

                    <svg viewBox='0 0 512 512' width='24px' fill='white'>
                        <path d='M482.696 299.276l-32.61-18.827a195.168 195.168 0 0 0 0-48.899l32.61-18.827c9.576-5.528 14.195-16.902 11.046-27.501-11.214-37.749-31.175-71.728-57.535-99.595-7.634-8.07-19.817-9.836-29.437-4.282l-32.562 18.798a194.125 194.125 0 0 0-42.339-24.48V38.049c0-11.13-7.652-20.804-18.484-23.367-37.644-8.909-77.118-8.91-114.77 0-10.831 2.563-18.484 12.236-18.484 23.367v37.614a194.101 194.101 0 0 0-42.339 24.48L105.23 81.345c-9.621-5.554-21.804-3.788-29.437 4.282-26.36 27.867-46.321 61.847-57.535 99.595-3.149 10.599 1.47 21.972 11.046 27.501l32.61 18.827a195.168 195.168 0 0 0 0 48.899l-32.61 18.827c-9.576 5.528-14.195 16.902-11.046 27.501 11.214 37.748 31.175 71.728 57.535 99.595 7.634 8.07 19.817 9.836 29.437 4.283l32.562-18.798a194.08 194.08 0 0 0 42.339 24.479v37.614c0 11.13 7.652 20.804 18.484 23.367 37.645 8.909 77.118 8.91 114.77 0 10.831-2.563 18.484-12.236 18.484-23.367v-37.614a194.138 194.138 0 0 0 42.339-24.479l32.562 18.798c9.62 5.554 21.803 3.788 29.437-4.283 26.36-27.867 46.321-61.847 57.535-99.595 3.149-10.599-1.47-21.972-11.046-27.501zm-65.479 100.461l-46.309-26.74c-26.988 23.071-36.559 28.876-71.039 41.059v53.479a217.145 217.145 0 0 1-87.738 0v-53.479c-33.621-11.879-43.355-17.395-71.039-41.059l-46.309 26.74c-19.71-22.09-34.689-47.989-43.929-75.958l46.329-26.74c-6.535-35.417-6.538-46.644 0-82.079l-46.329-26.74c9.24-27.969 24.22-53.869 43.929-75.969l46.309 26.76c27.377-23.434 37.063-29.065 71.039-41.069V44.464a216.79 216.79 0 0 1 87.738 0v53.479c33.978 12.005 43.665 17.637 71.039 41.069l46.309-26.76c19.709 22.099 34.689 47.999 43.929 75.969l-46.329 26.74c6.536 35.426 6.538 46.644 0 82.079l46.329 26.74c-9.24 27.968-24.219 53.868-43.929 75.957zM256 160c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z'/>
                    </svg>
                </header>
            </Fragment>
        )
    }
}

export { CalendarNavigation }
