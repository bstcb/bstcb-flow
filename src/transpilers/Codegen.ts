import { enumFromString } from '../helpers/helpers'
import { useCodeStore } from '../renderer/store/CodeStore'
import { Variable } from '../renderer/types/variable'

enum CodeLanguage {
    LANG_JS = 'javascript',

    // TODO: fill up with languages
}

function applyChunk(chunk: string) {
    useCodeStore
        .getState()
        .setCodeChunks([...useCodeStore.getState().codeChunks, chunk])
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
                const chunk = `let ${variable.name} = ${variable.value}\n`
                applyChunk(chunk)
                break
        }
    }

    static genOutput(expr: string) {
        switch (this.activeLanguage) {
            case CodeLanguage.LANG_JS:
                console.log(
                    `output generation in ${this.activeLanguage} with variable: ${expr}`,
                )
                const chunk = `console.log(${expr})\n`
                applyChunk(chunk)
                break
        }
    }

    static genIf(expr: string) {
        switch (this.activeLanguage) {
            case CodeLanguage.LANG_JS:
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
                console.log(
                    `for loop generation in ${this.activeLanguage} with expression: ${expr}`,
                )
                const chunk = `for (${expr}) {\n`
                applyChunk(chunk)
        }
    }
}
