import { action, observable, reaction } from 'mobx'
import { dateStore } from './DateStore'
import { getMeetings } from './../google/googleApi'

class MeetingStore {

    @observable
    meetings = []

    constructor() {
        this.subscribeToDateChange()
    }

    subscribeToDateChange() {
        reaction(
            () => dateStore.date,
            async (date) => {
                this.meetings = await getMeetings(date)
            }
        )
    }
}

const meetingStore = new MeetingStore()

export { meetingStore }
