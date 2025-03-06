import Preferences from "../components/Preferences/Preferences";

export const preferencesWindowLayout = {
    mode: 'float',
    children: [
        {
            tabs: [
                {
                    id: 'preferences',
                    title: 'preferences',
                    content: <Preferences />,
                    closable: true
                }
            ],
        }
    ]
}
