import { action, observable, reaction } from 'mobx'
import { dateStore } from './DateStore'
import { getMeetings } from './../google/googleApi'

class MeetingStore {

    @observable
    meetings = []

    subscribeToDateChange = reaction(
        () => dateStore.date,
        async (date) => {
            this.meetings = await getMeetings(date)
        }
    )

    @action
    async getMeetings() {
        console.log('get meetings')
    }
}

const meetingStore = new MeetingStore()

export { meetingStore }
