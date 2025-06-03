import i18n from '../../../../i18config'

export type PreferencesMenuItem = {
  title: string
  url: string
}

export const preferencesMenu: PreferencesMenuItem[] = [
  {
    title: i18n.t('GENRAL_SETTINGS'),
    url: '/preferences/general',
  },
  {
    title: i18n.t('APPEARANCE_SETTINGS'),
    url: '/preferences/appearance',
  },
]
