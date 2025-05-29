import { MenuEvent } from '../common/menuEvent'
import { usePreferencesStore } from './store/PreferencesStore'
export function setupMenuEventHandler() {
  window.electron.ipcRenderer.on('menu-event', (event: MenuEvent) => {
    console.log('[MENU HANDLER]: recieved menu-event: ' + event)
    switch (event) {
      case MenuEvent.NENU_VIEW_PREFERENCES:
        usePreferencesStore.getState().openPreferences()
        break
    }
  })
}
