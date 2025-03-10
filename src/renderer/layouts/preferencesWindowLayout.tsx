import { LayoutData, TabData } from "rc-dock";
import Preferences from "../components/preferences/Preferences";

const preferencesTab: TabData = {
    id: 'preferences',
    title: 'preferences',
    content: <Preferences />,
    closable: true

}

// @TODO: give it better name
// layout is just a current layout
export function applyPreferencesLayout(layout: LayoutData) {
    console.log('[PREFERENCES WINDOW DEBUG]: layout before')
    console.log(layout)
    layout.floatbox!.children.push({
        tabs: [
            preferencesTab
        ],
        w: 800, h: 600
    })
    console.log('[PREFERENCES WINDOW DEBUG]: layout after')
    console.log(layout)

    return layout
}
