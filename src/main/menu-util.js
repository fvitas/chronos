const { app, Menu } = require('electron')

function isDev() {
    return !process.mainModule.filename.includes('app.asar')
}

function isMac() {
    return process.platform === 'darwin'
}

function getMenu(mainWindow) {
    const menuTemplate = [{
        label: 'Edit',
        submenu: [{
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
        }, {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
        }, {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
        }, {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
        }]
    }]

    if (isDev()) {
        menuTemplate.push({
            label: 'Developer',
            submenu: [{
                label: 'Toggle Developer Tools',
                accelerator: isMac() ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click() { mainWindow.webContents.toggleDevTools() }
            }]
        })
    }

    if (isMac()) {
        menuTemplate.unshift({
            label: 'Chronos',
            submenu: [{
                label: 'About Chronos',
                role: 'about'
            }, {
                type: 'separator'
            }, {
                label: 'Preferences',
                accelerator: '',
                role: 'hide'
            }, {
                label: 'Check for Updates',
                accelerator: '',
                role: 'hide'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() { app.quit() }
            }]
        })
    }

    return Menu.buildFromTemplate(menuTemplate)
}


module.exports = { getMenu }