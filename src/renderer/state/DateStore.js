import { action, observable } from 'mobx'

class DateStore {

    @observable
    date = new Date()

    @action
    changeDate(newDate) {
        this.date = newDate
    }

    @action
    decreaseMonth() {
        this.date = new Date(
            this.date.getFullYear(),
            this.date.getMonth() - 1,
            this.date.getDate()
        )
    }

    @action
    increaseMonth() {
        this.date = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            this.date.getDate()
        )
    }

    @action
    selectDate(year, month, day) {
        this.date = new Date(year, month, day)
    }
}

const dateStore = new DateStore()

export { dateStore }
