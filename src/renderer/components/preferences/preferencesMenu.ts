import i18n from '../../../../i18config'

export type PreferencesMenuItem = {
  title: string
  url: string
}

export const preferencesMenu: PreferencesMenuItem[] = [
  {
    title: i18n.t('APPEARANCE_SETTINGS'),
    url: '/preferences/appearance',
  },
  {
    title: i18n.t('LANGUAGE_SETTINGS'),
    url: '/preferences/language',
  },
]
