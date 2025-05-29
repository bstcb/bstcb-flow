import { PanelData } from 'rc-dock'
import Preferences from '../components/preferences/Preferences'
import i18n from '../../../i18config'

export const preferencesPanel: PanelData = {
  tabs: [
    {
      id: 'preferences',
      title: i18n.t('DOCK_PREFERENCES'),
      content: <Preferences />,
      closable: true,
    },
  ],
  w: 800,
  h: 600,
}
