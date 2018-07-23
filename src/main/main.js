
const { app, shell, ipcMain, BrowserWindow, Menu } = require('electron')

const menubar = require('menubar')
const path = require('path')
const url = require('url')

const { contextMenu, applicationMenu  } = require('./menus')

function handleRedirect (event, url) {
    if (url !== mb.window.webContents.getURL()) {
        event.preventDefault()
        shell.openExternal(url)
    }
}

let preferenceWindow

function openPreferenceWindow () {
    if (preferenceWindow) {
        return preferenceWindow.show()
    }

    preferenceWindow = new BrowserWindow({
        width: 400,
        height: 480,
        resizable: false,
        minimizable: false,
        maximizable: false,
        movable: true,
        titleBarStyle: 'hiddenInset',
        show: false
    })

    preferenceWindow.loadURL(process.env.PARCEL_URL ? `${process.env.PARCEL_URL}/preferences.html` : url.format({ pathname: path.join(__dirname, '../renderer/preferences.html'), protocol: 'file:', slashes: true }));

    preferenceWindow.on('ready-to-show', () => { preferenceWindow.show() })
    preferenceWindow.on('close', () => { preferenceWindow = null })
}

let mb = menubar({
    alwaysOnTop: true,
    showDockIcon: false,
    index: process.env.PARCEL_URL ? `${process.env.PARCEL_URL}/index.html` : url.format({ pathname: path.join(__dirname, '../renderer/index.html'), protocol: 'file:', slashes: true }),
    icon: path.join(__dirname, '../../static/icons/IconTemplate.png'),
    width: 320,
    height: 650,
    y: 20,
    transparent: true,
    hasShadow: false,
    resizable: false,
    frame: false,
    showOnAllWorkspaces: true,
    useContentSize: true,
    preloadWindow: true,
    tooltip: 'Chronos',
    webPreferences: {
        experimentalFeatures: true
    }
})

mb.on('show', () => {
    app.chronos = { openPreferenceWindow }

    Menu.setApplicationMenu(applicationMenu)
})

mb.on('after-show', () => {
    mb.window.webContents.on('will-navigate', handleRedirect)
    mb.window.webContents.on('new-window', handleRedirect)
})

mb.on('after-hide', () => {
    mb.window.webContents.removeListener('will-navigate', handleRedirect)
    mb.window.webContents.removeListener('new-window', handleRedirect)
})

mb.on('window-all-closed', app.quit)


//--------------------------------------------------------------------------------------------------------

ipcMain.on('show-context-menu', (event, coordinates) => {
    contextMenu.popup({
        x: Math.floor(coordinates.x) + 10,
        y: Math.floor(coordinates.y) + 15
    })
})
