import { PanelData } from "rc-dock";
import Preferences from "../components/preferences/Preferences";

export const preferencesPanel: PanelData = {
    tabs: [
        {
            id: 'preferences',
            title: 'preferences',
            content: <Preferences />,
            closable: true
        }
    ],
    w: 800, h: 600,
}
