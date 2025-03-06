import { MenuEvent } from "../common/menuEvent";
export function setupHandler() {
  window.electron.ipcRenderer.on(
    'menu-event',
    (event: MenuEvent) => {
      switch (event) {
        case MenuEvent.NENU_VIEW_PREFERENCES:
          
          break
      }
    }

  )
}
