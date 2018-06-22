
const remote = nodeRequire('electron').remote
const OAuth2Client = nodeRequire('google-auth-library').OAuth2Client

function logInWithGoogle(credentials) {

    let oAuth2Client = new OAuth2Client(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris[0]
    )
    let authorizeUrl = oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: 'https://www.googleapis.com/auth/calendar.readonly' })

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

                let response = await oAuth2Client.getToken(code)

                resolve(response.tokens)
            }
        })

        authWindow.loadURL(authorizeUrl)
    })
}

export { logInWithGoogle }