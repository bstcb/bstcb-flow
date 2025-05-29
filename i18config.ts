import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from './localizations/en.json'
import translationRU from './localizations/ru.json'
import I18NexFsBackend from 'i18next-fs-backend'
import { FsBackendOptions } from 'i18next-fs-backend'

i18n
  // Add React bindings as a plugin.
  .use(initReactI18next)
  // .use(I18NexFsBackend)
  // Initialize the i18next instance.
  .init({
    // backend: {
    //   loadPath: "./localizations/{{lng}}.json"
    //   }
    // Config options
    lng: 'ru',

    fallbackLng: 'en',

    // Enables useful output in the browser’s
    // dev console.
    debug: true,

    interpolation: {
      escapeValue: false,
    },

    resources: {
      // English
      en: {
        // `translation` is the default namespace.
        // More details about namespaces shortly.
        translation: translationEN,
      },
      // Russian
      ru: {
        translation: translationRU,
      },
    },
  })

export default i18n
