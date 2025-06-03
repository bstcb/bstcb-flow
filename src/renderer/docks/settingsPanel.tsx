import { PanelData } from 'rc-dock'
import i18n from '../../../i18config'
import Settings from '../components/settings/Settings'

export const settingsPanel: PanelData = {
  tabs: [
    {
      id: 'settings',
      title: i18n.t('DOCK_SETTINGS'),
      content: <Settings />,
      closable: true,
    },
  ],
  w: 800,
  h: 600,
}
