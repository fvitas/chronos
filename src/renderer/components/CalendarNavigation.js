import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'

@inject('dateStore')
@observer
class CalendarNavigation extends Component {

    createNew = (event) => {
        let { dateStore } = this.props

        dateStore.changeDate(new Date())
    }

    render() {
        let { dateStore } = this.props

        return (
            <Fragment>
                <div>{ dateStore.date.toLocaleString() }</div>
                <button onClick={this.createNew}>create new</button>
            </Fragment>
        )
    }
}

export { CalendarNavigation }
