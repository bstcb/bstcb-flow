export class JSInterpriter {
  static runCode(code: string) {
    const sandbox: Record<string, any> = {
      console: {
        log: (...args: any[]) => {
          // capture or redirect logs here
          console.log('Sandbox log:', ...args)
          return args.join(' ')
        },
      },
      // add other safe globals if needed
    }

    const script = new Function(
      'sandbox',
      `
      with(sandbox) {
        return eval(\`${code}\`);
      }
    `,
    )

    try {
      return script(sandbox)
    } catch (e) {
      return `Error: ${e.message}`
    }
  }
}
