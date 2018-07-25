import './preferences.styl'

document
    .querySelector('#logout')
    .addEventListener('click', () => {
        let calendar = nodeRequire('electron').remote.webContents.fromId(1) // calendar window is always first window

        calendar.send('delete-user-token')
    })

document
    .querySelector('#deleteClient')
    .addEventListener('click', () => {
        let calendar = nodeRequire('electron').remote.webContents.fromId(1)

        calendar.send('delete-client-credentials')
    })