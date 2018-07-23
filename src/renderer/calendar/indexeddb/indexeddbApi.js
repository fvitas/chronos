import idb from 'idb'

async function initDB() {
    await idb.open('user', 1, upgradeDB => {
        upgradeDB.createObjectStore('credentials', { keyPath: 'client_id' })
        upgradeDB.createObjectStore('tokens', { keyPath: 'access_token' })
    })
}

async function getUserCredentials() {
    let db = await idb.open('user', 1)

    let tx = db.transaction('credentials', 'readonly')
    let store = tx.objectStore('credentials')

    let credentials = await store.getAll()

    return credentials[0]
}

async function saveUserCredentials(credentials) {
    let db = await idb.open('user', 1)

    let tx = db.transaction('credentials', 'readwrite')
    let store = tx.objectStore('credentials')

    await store.put(credentials.installed)

    await tx.complete
    db.close()
}

async function saveTokens(tokens) {
    let db = await idb.open('user', 1)

    let tx = db.transaction('tokens', 'readwrite')
    let store = tx.objectStore('tokens')

    await store.put(tokens)

    await tx.complete
    db.close()
}

async function getTokens() {
    let db = await idb.open('user', 1)

    let tx = db.transaction('tokens', 'readonly')
    let store = tx.objectStore('tokens')

    let credentials = await store.getAll()

    return credentials[0]
}

export { initDB, getUserCredentials, saveUserCredentials, saveTokens, getTokens }
