
const { remote } = nodeRequire('electron')
const { google } = nodeRequire('googleapis')

let authClient

function initAuthClient(credentials) {
    if (!credentials) return

    authClient = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris[0]
    )
}

function setAuthTokens(tokens) {
    if (!authClient) return

    authClient.setCredentials(tokens)
}

function logInWithGoogle(credentials) {

    initAuthClient(credentials)

    let authorizeUrl = authClient.generateAuthUrl({ access_type: 'offline', scope: 'https://www.googleapis.com/auth/calendar.readonly' })

    return new Promise((resolve, reject) => {

        let authWindow = new remote.BrowserWindow({ width: 350, height: 550 })

        authWindow.on('closed', () => { authWindow = null })

        authWindow.on('page-title-updated', async () => {
            const title = authWindow.getTitle()

            if (title.startsWith('Denied')) {

                authWindow.removeAllListeners('closed')
                authWindow.close()
                reject(new Error('Permission Denied'))

            } else if (title.startsWith('Success')) {
                let code = title.split(/[ =]/)[2]

                authWindow.removeAllListeners('closed')
                authWindow.removeAllListeners('page-title-updated')
                authWindow.close()

                let response = await authClient.getToken(code)

                resolve(response.tokens)
            }
        })

        authWindow.loadURL(authorizeUrl)
    })
}

async function getMeetings() {
    let calendar = google.calendar({ version: 'v3', auth: authClient })

    let response = await calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    })

    return response.data.items
}

export { initAuthClient, setAuthTokens, logInWithGoogle, getMeetings }
