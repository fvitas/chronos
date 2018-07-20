
const { app, shell, Menu } = require('electron')

const menubar = require('menubar')
const path = require('path')
const url = require('url')

const { getMenu } = require('./menu-util')

const mb = menubar({
    alwaysOnTop: true,
    showDockIcon: false,
    index: process.env.ELECTRON_START_URL || url.format({ pathname: path.join(__dirname, '../renderer/index.html'), protocol: 'file:', slashes: true }),
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

function handleRedirect (event, url) {
    if (url !== mb.window.webContents.getURL()) {
        event.preventDefault()
        shell.openExternal(url)
    }
}

mb.on('show', () => {
    const menu = getMenu(mb.window)
    Menu.setApplicationMenu(menu)
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
