import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'

@inject('dateStore')
@observer
class CalendarData extends Component {

    createNew = (event) => {
        this.props.dateStore.changeDate(new Date())
    }

    render() {
        return (
            <Fragment>
                <div>{ this.props.dateStore.date.toLocaleString() }</div>
                <button onClick={this.createNew}>create new</button>
            </Fragment>
        )
    }
}

export { CalendarData }
