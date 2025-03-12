import {
    BrowserWindow,
    Menu,
    MenuItemConstructorOptions,
    app,
    shell,
} from 'electron'
import { VariableParser } from '../transpilers/VariableParser'
import { MenuEvent } from '../common/menuEvent'

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
    selector?: string
    submenu?: DarwinMenuItemConstructorOptions[] | Menu
}

export default class MenuBuilder {
    mainWindow: BrowserWindow

    constructor(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow
    }

    buildMenu(): Menu {
        if (
            process.env.NODE_ENV === 'development' ||
            process.env.DEBUG_PROD === 'true'
        ) {
            this.setupDevelopmentEnvironment()
        }

        const template: Electron.MenuItem[] = [
            {
                label: 'File',
                submenu: [
                    {
                        id: MenuEvent.MENU_FILE_SAVE,
                        label: 'Save',
                        accelerator: "Ctrl+S",
                        click: () => {
                            console.log('[MENU]: File/Save triggered')
                        },
                    },
                    {
                        id: MenuEvent.MENU_FILE_OPEN,
                        label: 'Open',
                        accelerator: "Ctrl+O",
                        click: () => {
                            console.log('[MENU]: File/Open triggered')
                        },
                    }
                ]
            },
            {
                label: 'Edit',
                submenu: [
                    {
                        id: MenuEvent.MENU_EDIT_UNDO,
                        label: 'Undo',
                        accelerator: "Ctrl+Z",
                        click: () => {
                            console.log('[MENU]: Edit/Undo triggered')
                        },
                    },
                    {
                        id: MenuEvent.MENU_EDIT_REDO,
                        label: 'Redo',
                        accelerator: "Ctrl+Shift+Z",
                        click: () => {
                            console.log('[MENU]: Edit/Redo triggered')
                        },
                    }
                ]
            },
            {
                label: 'View',
                submenu: [
                    {
                        id: MenuEvent.NENU_VIEW_PREFERENCES,
                        label: 'Preferences',
                        accelerator: 'Alt+K',
                        click: () => {
                            console.log('[MENU]: View/Preferences triggered')
                            this.mainWindow.webContents.send(
                                'menu-event',
                                MenuEvent.NENU_VIEW_PREFERENCES
                            )
                        }
                    }
                ]
            },
            {
                label: 'Nodes',
                submenu: [
                    {
                        label: 'Add Node',
                        submenu: [
                            {
                                label: 'If Branch',
                                click: () => {
                                    console.log('[MENU]: Nodes/If Branch triggered')
                                    this.mainWindow.webContents.send(
                                        'add-node',
                                        '_if_cond',
                                        'x == 0',
                                    )
                                },
                            },
                          {
                                label: 'If Branch End',
                                click: () => {
                                    console.log('[MENU]: Nodes/If Branch End triggered')
                                    this.mainWindow.webContents.send(
                                        'add-node',
                                        '_if_cond_end',
                                        '',
                                    )
                                },
                          },
                            {
                                label: 'For Loop',
                                click: () => {
                                    console.log('[MENU]: Nodes/For Loop triggered')
                                    this.mainWindow.webContents.send(
                                        'add-node',
                                        '_for_lp',
                                        'let i = 0; i < 5; i++',
                                    )
                                },
                            },
                            {
                                label: 'While Loop',
                                click: () => {
                                    console.log('[MENU]: Nodes/While Loop triggered')
                                    this.mainWindow.webContents.send(
                                        'add-node',
                                        '_while_lp',
                                        'i < 5',
                                    )
                                },
                            },
                            {
                                label: 'Input',
                                click: () => {
                                    console.log('[MENU]: Nodes/Input triggered')
                                    this.mainWindow.webContents.send(
                                        'add-node',
                                        '_input',
                                        'x = 0',
                                    )
                                },
                            },
                            {
                                label: 'output',
                                click: () => {
                                    console.log('[MENU]: Nodes/Output triggered')
                                    this.mainWindow.webContents.send('add-node', '_output', 'x,y')
                                },
                            },
                        ],
                    },
                ],
            },
        ]
        const menu = Menu.buildFromTemplate(template)

        Menu.setApplicationMenu(menu)

        return menu
    }

    setupDevelopmentEnvironment(): void {
        this.mainWindow.webContents.on('context-menu', (_, props) => {
            const { x, y } = props

            Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click: () => {
                        this.mainWindow.webContents.inspectElement(x, y)
                    },
                },
            ]).popup({ window: this.mainWindow })
        })
    }

    buildDarwinTemplate(): MenuItemConstructorOptions[] {
        const subMenuAbout: DarwinMenuItemConstructorOptions = {
            label: 'Electron',
            submenu: [
                {
                    label: 'About ElectronReact',
                    selector: 'orderFrontStandardAboutPanel:',
                },
                { type: 'separator' },
                { label: 'Services', submenu: [] },
                { type: 'separator' },
                {
                    label: 'Hide ElectronReact',
                    accelerator: 'Command+H',
                    selector: 'hide:',
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    selector: 'hideOtherApplications:',
                },
                { label: 'Show All', selector: 'unhideAllApplications:' },
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit()
                    },
                },
            ],
        }
        const subMenuEdit: DarwinMenuItemConstructorOptions = {
            label: 'Edit',
            submenu: [
                { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
                { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
                { type: 'separator' },
                { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
                { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
                { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
                {
                    label: 'Select All',
                    accelerator: 'Command+A',
                    selector: 'selectAll:',
                },
            ],
        }
        const subMenuViewDev: MenuItemConstructorOptions = {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'Command+R',
                    click: () => {
                        this.mainWindow.webContents.reload()
                    },
                },
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click: () => {
                        this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
                    },
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click: () => {
                        this.mainWindow.webContents.toggleDevTools()
                    },
                },
            ],
        }
        const subMenuViewProd: MenuItemConstructorOptions = {
            label: 'View',
            submenu: [
                {
                    label: 'Toggle Full Screen',
                    accelerator: 'Ctrl+Command+F',
                    click: () => {
                        this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
                    },
                },
            ],
        }
        const subMenuWindow: DarwinMenuItemConstructorOptions = {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    selector: 'performMiniaturize:',
                },
                { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
                { type: 'separator' },
                { label: 'Bring All to Front', selector: 'arrangeInFront:' },
            ],
        }
        const subMenuHelp: MenuItemConstructorOptions = {
            label: 'Help',
            submenu: [
                {
                    label: 'Learn More',
                    click() {
                        shell.openExternal('https://electronjs.org')
                    },
                },
                {
                    label: 'Documentation',
                    click() {
                        shell.openExternal(
                            'https://github.com/electron/electron/tree/main/docs#readme',
                        )
                    },
                },
                {
                    label: 'Community Discussions',
                    click() {
                        shell.openExternal('https://www.electronjs.org/community')
                    },
                },
                {
                    label: 'Search Issues',
                    click() {
                        shell.openExternal('https://github.com/electron/electron/issues')
                    },
                },
            ],
        }

        const subMenuView =
            process.env.NODE_ENV === 'development' ||
                process.env.DEBUG_PROD === 'true'
                ? subMenuViewDev
                : subMenuViewProd

        return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp]
    }

    buildDefaultTemplate() {
        const templateDefault = [
            {
                label: '&File',
                submenu: [
                    {
                        label: '&Open',
                        accelerator: 'Ctrl+O',
                    },
                    {
                        label: '&Close',
                        accelerator: 'Ctrl+W',
                        click: () => {
                            this.mainWindow.close()
                        },
                    },
                ],
            },
            {
                label: '&View',
                submenu:
                    process.env.NODE_ENV === 'development' ||
                        process.env.DEBUG_PROD === 'true'
                        ? [
                            {
                                label: '&Reload',
                                accelerator: 'Ctrl+R',
                                click: () => {
                                    this.mainWindow.webContents.reload()
                                },
                            },
                            {
                                label: 'Toggle &Full Screen',
                                accelerator: 'F11',
                                click: () => {
                                    this.mainWindow.setFullScreen(
                                        !this.mainWindow.isFullScreen(),
                                    )
                                },
                            },
                            {
                                label: 'Toggle &Developer Tools',
                                accelerator: 'Alt+Ctrl+I',
                                click: () => {
                                    this.mainWindow.webContents.toggleDevTools()
                                },
                            },
                        ]
                        : [
                            {
                                label: 'Toggle &Full Screen',
                                accelerator: 'F11',
                                click: () => {
                                    this.mainWindow.setFullScreen(
                                        !this.mainWindow.isFullScreen(),
                                    )
                                },
                            },
                        ],
            },
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'Learn More',
                        click() {
                            shell.openExternal('https://electronjs.org')
                        },
                    },
                    {
                        label: 'Documentation',
                        click() {
                            shell.openExternal(
                                'https://github.com/electron/electron/tree/main/docs#readme',
                            )
                        },
                    },
                    {
                        label: 'Community Discussions',
                        click() {
                            shell.openExternal('https://www.electronjs.org/community')
                        },
                    },
                    {
                        label: 'Search Issues',
                        click() {
                            shell.openExternal('https://github.com/electron/electron/issues')
                        },
                    },
                ],
            },
        ]

        return templateDefault
    }
}
