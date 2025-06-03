import { MenuEvent } from '../common/menuEvent'
import { useSettingsStore } from './store/SettingsStore'

export function setupMenuEventHandler() {
  window.electron.ipcRenderer.on('menu-event', (event: MenuEvent) => {
    console.log('[MENU HANDLER]: recieved menu-event: ' + event)
    switch (event) {
      case MenuEvent.NENU_VIEW_SETTINGS:
        useSettingsStore.getState().openSettings()
        break
    }
  })
}
