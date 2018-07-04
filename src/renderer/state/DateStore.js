import { action, observable } from 'mobx'

class DateStore {

    @observable
    date = new Date()

    @action
    changeDate(newDate) {
        this.date = newDate
    }
}

const dateStore = new DateStore()

export { dateStore }
