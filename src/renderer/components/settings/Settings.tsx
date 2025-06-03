import {
  SettingsPane,
  SettingsPage,
  SettingsContent,
  SettingsMenu,
} from 'react-settings-pane'

import './Settings.scss'
import { useSettingsStore } from '../../store/SettingsStore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../../../../i18config'

const Settings = () => {
  // localizing settings window buttons
  useEffect(() => {
    let setttingsCloseDiv = document.querySelector('.settings-close')
    let closeButton = setttingsCloseDiv!.querySelector('button')
    let saveButton = document.querySelector('.settings-close+button')
    saveButton!.textContent = i18n.t('APPEARANCE_SETTINGS_SAVE_BTN')
    closeButton!.textContent = i18n.t('APPEARANCE_SETTINGS_CLOSE_BTN')
  }, [])

  const { t } = useTranslation()

  const defaultSettings = {
    'general.language': 'ru',
    'general.colorTheme': 'light',
  }

  const menu = [
    {
      title: i18n.t('GENERAL_SETTINGS'),
      url: '/general',
    },
  ]
  // @TODO: replace 'any'
  const saveSettings = (settings: any) => {
    console.log('saving settings')
    console.log(settings)
    localStorage.setItem('settings', JSON.stringify(settings))
    useSettingsStore.getState().closeSettings()
    window.electron.ipcRenderer.sendMessage('reload')
  }

  // Save settings after close
  const leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
    // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.
    console.log('leavePaneHandler')
    console.log('wasSaved')
    console.log(wasSaved)
    console.log('oldSettings')
    console.log(oldSettings)
    console.log('newSettings')
    console.log(newSettings)

    if (wasSaved && newSettings !== oldSettings) {
      console.log(wasSaved && newSettings !== oldSettings)
      saveSettings(newSettings)
    } else {
      useSettingsStore.getState().closeSettings()
    }
  }

  const settingsChanged = (changedSettings) => {
    // this is triggered onChange of the inputs
    console.log('settings changed')
    console.log(changedSettings)
  }

  const settings =
    JSON.parse(localStorage.getItem('settings')) || defaultSettings

  return (
    <>
      <SettingsPane
        items={menu}
        index='/general'
        settings={settings}
        onPaneLeave={leavePaneHandler}>
        <SettingsMenu headline={t('SETTINGS')} />
        <SettingsContent
          closeButtonClass='btn btn-danger'
          saveButtonClass='btn btn-primary'
          header={true}>
          {/* general */}
          <SettingsPage handler='/general'>
            <fieldset className='form-group'>
              <label htmlFor='language'>{t('LANGUAGE_SETTINGS')}</label>
              <select
                name='general.language'
                id='language'
                className='form-control'
                defaultValue={settings['general.language']}>
                <option value='en'>{t('LANGUAGE_ENG')}</option>
                <option value='ru'>{t('LANGUAGE_RU')}</option>
              </select>
            </fieldset>
            <fieldset className='form-group'>
              <label htmlFor='colorTheme'>
                {t('APPEARANCE_SETTINGS_COLORTHEME')}
              </label>
              <select
                name='general.colorTheme'
                id='colorTheme'
                className='form-control'
                defaultValue={settings['general.colorTheme']}>
                <option value='light'>
                  {t('APPEARANCE_SETTINGS_COLORTHEME_LIGHT')}
                </option>
                <option value='dark'>
                  {t('APPEARANCE_SETTINGS_COLORTHEME_DARK')}
                </option>
              </select>
            </fieldset>
          </SettingsPage>
        </SettingsContent>
      </SettingsPane>
    </>
  )
}

export default Settings
