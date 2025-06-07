import { enumFromString } from '../helpers/helpers'
import { useCodeStore } from '../renderer/store/CodeStore'
import { Variable } from '../renderer/types/variable'
import { CodeLanguage } from './CodeLanguage'

function applyChunk(chunk: string) {
  useCodeStore.getState().setCode(useCodeStore.getState().code + chunk)
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
    console.log(
      `input generation in ${this.activeLanguage} with variable: ${variable.name}: ${variable.value}`,
    )

    let chunk: string
    switch (this.activeLanguage) {
      case CodeLanguage.LANG_JS:
        chunk = `let ${variable.name} = ${variable.value}\n`
        applyChunk(chunk)
        break
      case CodeLanguage.LANG_CSHARP:
        chunk = `var ${variable.name} = ${variable.value};\n`
        applyChunk(chunk)
        break
    }
  }

  static genOutput(expr: string) {
    console.log(
      `output generation in ${this.activeLanguage} with variable: ${expr}`,
    )

    let chunk: string
    switch (this.activeLanguage) {
      case CodeLanguage.LANG_JS:
        chunk = `console.log(${expr})\n`
        applyChunk(chunk)
        break
      case CodeLanguage.LANG_CSHARP:
        chunk = `System.Console.WriteLine(${expr});\n`
        applyChunk(chunk)
        break
    }
  }

  static genIf(expr: string) {
    switch (this.activeLanguage) {
      case CodeLanguage.LANG_JS:
      case CodeLanguage.LANG_CSHARP:
        console.log(
          `if condition generation in ${this.activeLanguage} with expression: ${expr}`,
        )
        const chunk = `if (${expr}) {\n`
        applyChunk(chunk)
    }
  }

  static genWhile(expr: string) {
    switch (this.activeLanguage) {
      case CodeLanguage.LANG_JS:
      case CodeLanguage.LANG_CSHARP:
        console.log(
          `while loop generation in ${this.activeLanguage} with expression: ${expr}`,
        )
        const chunk = `while (${expr}) {\n`
        applyChunk(chunk)
    }
  }

  static genFor(expr: string) {
    switch (this.activeLanguage) {
      case CodeLanguage.LANG_JS:
      case CodeLanguage.LANG_CSHARP:
        console.log(
          `for loop generation in ${this.activeLanguage} with expression: ${expr}`,
        )
        const chunk = `for (${expr}) {\n`
        applyChunk(chunk)
    }
  }

  static genBlockEnd() {
    switch (this.activeLanguage) {
      case CodeLanguage.LANG_JS:
      case CodeLanguage.LANG_CSHARP:
        console.log(`block end generation in ${this.activeLanguage}`)
        const chunk = `}\n`
        applyChunk(chunk)
    }
  }
}
