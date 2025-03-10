import { SettingsPane, SettingsPage, SettingsContent, SettingsMenu } from 'react-settings-pane'

import './Preferences.scss'
import { preferencesMenu } from './preferencesMenu';
import { preferences } from './preferences';

const Preferences = () => {

    // Save settings after close
    const leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
        // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.

        if (wasSaved && newSettings !== oldSettings) {
            // do something with the settings, e.g. save via ajax.
        }
    };

    const settingsChanged = (changedSettings) => {
        // this is triggered onChange of the inputs
    };

    return <>
        <SettingsPane items={preferencesMenu} index={preferencesMenu[0].url} onPaneLeave={leavePaneHandler}>
            <SettingsMenu headline="Appearance Settings" />
            <SettingsContent closeButtonClass="secondary" saveButtonClass="primary" header={true}>
                <SettingsPage handler={preferencesMenu[0].url}>
                    <fieldset className="form-group">
                        <label htmlFor="colorTheme">Color-Theme: </label>
                        <select name={Object.keys(preferences)[0]} id="colorTheme" className="form-control" defaultValue={preferences['preferences.appearance.colorTheme']}>
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
