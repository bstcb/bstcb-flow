import {
  SettingsPane,
  SettingsPage,
  SettingsContent,
  SettingsMenu,
} from 'react-settings-pane';

import './Preferences.scss';
import { preferencesMenu } from './preferencesMenu';
import { Preferences, preferences } from './preferences';
import { usePreferencesStore } from '../../store/PreferencesStore';
import { useState } from 'react';

const Preferences = () => {
  const savedPrefs = usePreferencesStore.getState().preferences;
  const [newPrefs, setNewPrefs] = useState<Preferences>(savedPrefs);

  function savePrefs(newSettings: Preferences) {
    console.log('savePrefs triggered');
    usePreferencesStore.getState().setPreferences(newSettings);
  }

  // Save settings after close
  const leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
    console.log('leave handler triggered');

    // for now it is mapped like this
    // because package can't internally update `newSettings`
    oldSettings = usePreferencesStore.getState().preferences;
    newSettings = newPrefs;

    console.log(wasSaved && newSettings !== oldSettings);
    console.log(wasSaved);
    console.log('newSettings');
    console.log(newSettings);
    console.log('oldSettings');
    console.log(oldSettings);

    if (wasSaved && newSettings !== oldSettings) {
      console.log('save and quit');
      savePrefs(newPrefs);
    }

    if (!wasSaved && newSettings !== oldSettings) {
      if (confirm('Save Changes?')) {
        console.log('confirm save and quit');
        savePrefs(newPrefs);
      } else {
        console.log('confirm discard and quit');
      }
    }
    // finally close the prefs window
    usePreferencesStore.getState().closePreferences();
  };

  const settingsChanged = (e) => {
    // debugger
    let changedPrefSelector: HTMLElement = e.target;
    let changedPrefName: string = changedPrefSelector.name;
    let changedPrefValue: string = changedPrefSelector.value; // not only string
    let prevPrefValue: string = newPrefs[changedPrefName];
    // show that setting is changed in ui
    if (prevPrefValue !== changedPrefValue) {
      changedPrefSelector.classList.add('settings-changed');
    } else {
      changedPrefSelector.classList.remove('settings-changed');
    }
    setNewPrefs({
      ...newPrefs,
      [changedPrefName]: changedPrefValue,
    });
    console.log('Updated preferences:', newPrefs);
  };

  return (
    <>
      <SettingsPane
        items={preferencesMenu}
        index={preferencesMenu[0].url}
        settings={newPrefs}
        onPaneLeave={leavePaneHandler}
      >
        <SettingsMenu headline="Appearance Settings" />
        <SettingsContent
          closeButtonClass="btn btn-danger"
          saveButtonClass="btn btn-primary"
          header={true}
        >
          <SettingsPage handler={preferencesMenu[0].url}>
            <fieldset className="form-group">
              <label htmlFor="colorTheme">Color-Theme: </label>
              <select
                name={Object.keys(newPrefs)[0]}
                onChange={settingsChanged}
                id="colorTheme"
                className="form-control"
                value={newPrefs['preferences.appearance.colorTheme']}
              >
                <option value={'light'}>Light</option>
                <option value={'dark'}>Dark</option>
              </select>
            </fieldset>
          </SettingsPage>
        </SettingsContent>
      </SettingsPane>
    </>
  );
};

export default Preferences;
