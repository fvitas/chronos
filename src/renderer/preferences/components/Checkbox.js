import React, { Component } from 'react'
import classnames from 'classcat'

class Checkbox extends Component {

    state = {
        checked: false
    }

    toggle = () => {
        this.setState({ checked: !this.state.checked })
    }

    render() {
        let checkBoxClasses = classnames({
            'checkbox': true,
            'checked':  this.state.checked
        })

        return (
            <div className={checkBoxClasses} onClick={this.toggle}>
                <div className='toggle'>
                    <div className='ball'/>
                </div>
            </div>
        )
    }
}

export { Checkbox }