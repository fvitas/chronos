const {app, Menu, shell, ipcMain, Notification} = require('electron')
// const { checkForUpdates } require('./auto-updater')

function isDev() {
    return !process.mainModule.filename.includes('app.asar')
}

function isMac() {
    return process.platform === 'darwin'
}

let checkForUpdatesItem = {
    label: 'Check for Updates',
    click(item) {
        // checkForUpdates()
    }
}

let preferenceItem = {
    label: 'Preferences',
    accelerator: 'Cmd+,',
    click() {
        // app.chronos.openPrefsWindow()
    }
}


let contextMenuTemplate = [
    {
        role: 'about'
    },
    {
        type: 'separator'
    },
    preferenceItem,
    {
        type: 'separator'
    },
    checkForUpdatesItem,
    {
        type: 'separator'
    },
    {
        role: 'quit',
        accelerator: 'Cmd+Q'
    }
]

let applicationMenuTemplate = [
    {
        label: app.getName(),
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            preferenceItem,
            checkForUpdatesItem,
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'GitHub Repository',
                click: () => shell.openExternal('https://github.com/fvitas/chronos')
            }
        ]
    }
]

if (isDev()) {
    applicationMenuTemplate.push({
        label: 'Developer',
        submenu: [{
            label: 'Toggle Developer Tools',
            accelerator: isMac() ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
                if (focusedWindow) {
                    if (focusedWindow.isDevToolsOpened()) {
                        focusedWindow.closeDevTools()
                    } else {
                        focusedWindow.openDevTools({ mode: 'detach' })
                    }
                }
            }
        }]
    })
}

let contextMenu = Menu.buildFromTemplate(contextMenuTemplate)
let applicationMenu = Menu.buildFromTemplate(applicationMenuTemplate)

module.exports = { contextMenu, applicationMenu }