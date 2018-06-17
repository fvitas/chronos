const electron = require('electron')

const { app, BrowserWindow } = electron

const menubar = require('menubar')
const path = require('path')
const url = require('url')

if (process.env.ELECTRON_START_URL) {
    require('electron-reload')(__dirname)
}

const mb = menubar({
    alwaysOnTop: true,
    showDockIcon: true,
    index: process.env.ELECTRON_START_URL || url.format({ pathname: path.join(__dirname, 'build/index.html'), protocol: 'file:', slashes: true }),
    icon: path.join(__dirname, 'src/main/assets/icons/IconTemplate.png'),
    width: 320,
    height: 650,
    y: 20,
    transparent: true,
    hasShadow: false,
    resizable: false,
    frame: false,
    showOnAllWorkspaces: true,
    useContentSize: true,
    tooltip: 'Chronos',
    webPreferences: {
        experimentalFeatures: true
    }
})

mb.on('ready', function ready () {

})
