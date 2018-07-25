import idb from 'idb'

async function initDB() {
    await idb.open('user', 1, upgradeDB => {
        upgradeDB.createObjectStore('credentials', { keyPath: 'client_id' })
        upgradeDB.createObjectStore('tokens', { keyPath: 'access_token' })
    })
}

async function getClientCredentials() {
    let db = await idb.open('user', 1)

    let tx = db.transaction('credentials', 'readonly')
    let store = tx.objectStore('credentials')

    let credentials = await store.getAll()

    return credentials[0]
}

async function saveClientCredentials(credentials) {
    let db = await idb.open('user', 1)

    let tx = db.transaction('credentials', 'readwrite')
    let store = tx.objectStore('credentials')

    await store.put(credentials.installed)

    await tx.complete
    db.close()
}

async function deleteClientCredentials() {
    let db = await idb.open('user', 1)

    let tx = db.transaction('credentials', 'readwrite')
    let store = tx.objectStore('credentials')

    await store.clear()

    await tx.complete
    db.close()
}

async function saveUserTokens(tokens) {
    let db = await idb.open('user', 1)

    let tx = db.transaction('tokens', 'readwrite')
    let store = tx.objectStore('tokens')

    await store.put(tokens)

    await tx.complete
    db.close()
}

async function getUserTokens() {
    let db = await idb.open('user', 1)

    let tx = db.transaction('tokens', 'readonly')
    let store = tx.objectStore('tokens')

    let credentials = await store.getAll()

    return credentials[0]
}

async function deleteUserTokens() {
    let db = await idb.open('user', 1)

    let tx = db.transaction('tokens', 'readwrite')
    let store = tx.objectStore('tokens')

    await store.clear()

    await tx.complete
    db.close()
}

export { initDB, getClientCredentials, saveClientCredentials, deleteClientCredentials, saveUserTokens, getUserTokens, deleteUserTokens }
