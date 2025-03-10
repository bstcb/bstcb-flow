import { SettingsPane, SettingsPage, SettingsContent, SettingsMenu } from 'react-settings-pane'

import './Preferences.scss'
import { preferencesMenu } from './preferencesMenu';
import { Preferences, preferences } from './preferences';
import { usePreferencesStore } from '../../store/PreferencesStore';
import { useState } from 'react';

const Preferences = () => {
    const savedPrefs = usePreferencesStore.getState().preferences
    const [newPrefs, setNewPrefs] = useState<Preferences>(savedPrefs)

    // Save settings after close
    const leavePaneHandler = (_wasSaved, _newSettings, _oldSettings) => {
        // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.

    };

    const settingsChanged = (e) => {
        // debugger
        let changedPrefSelector: HTMLElement = e.target
        let changedPrefName: string = changedPrefSelector.name
        let changedPrefValue: string = changedPrefSelector.value // not only string
        let prevPrefValue: string = newPrefs[changedPrefName]
        // show that setting is changed in ui
        if (prevPrefValue !== changedPrefValue) {
            changedPrefSelector.classList.add('settings-changed')
        } else {
            changedPrefSelector.classList.remove('settings-changed')

        }
    };

    return <>
        <SettingsPane items={preferencesMenu} index={preferencesMenu[0].url} settings={preferences} onPaneLeave={leavePaneHandler}>
            <SettingsMenu headline="Appearance Settings" />
            <SettingsContent closeButtonClass="btn btn-danger" saveButtonClass="btn btn-primary" header={true}>
                <SettingsPage handler={preferencesMenu[0].url}>
                    <fieldset className="form-group">
                        <label htmlFor="colorTheme">Color-Theme: </label>
                        <select name={Object.keys(preferences)[0]} onChange={settingsChanged} id="colorTheme" className="form-control" defaultValue={preferences['preferences.appearance.colorTheme']}>
                            <option value={'light'}>Light</option>
                            <option value={'dark'}>Dark</option>
                        </select>
                    </fieldset>
                </SettingsPage>
            </SettingsContent>
        </SettingsPane>
    </>
}

export default Preferences
