import { enumFromString } from '../helpers/helpers'
import { useCodeStore } from '../renderer/store/CodeStore'
import { Variable } from '../renderer/types/variable'

enum CodeLanguage {
  LANG_JS = 'javascript',

  // TODO: fill up with languages
}

export class CodeGen {
  static activeLanguage: CodeLanguage
  static getActiveLang() {
    this.activeLanguage = enumFromString(
      CodeLanguage,
      useCodeStore.getState().activeLanguage,
    )!
  }

  static genInput(variable: Variable) {
    switch (this.activeLanguage) {
      case CodeLanguage.LANG_JS:
        console.log(
          `input generation in ${this.activeLanguage} with variable: ${variable.name}: ${variable.value}`,
        )
    }
  }
}
