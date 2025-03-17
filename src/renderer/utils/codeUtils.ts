import { UnclosedDelimiterError } from "../types/unclosedDelimiterError";

export function codeUheckUnclosedDelimiters(str: string): UnclosedDelimiterError | boolean {
  const stack = [];
  const opening = '({[';
  const closing = ')}]';
  const matching = { '(': ')', '{': '}', '[': ']' };

  let line = 1;
  let column = 1;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === '\n') {
      line++;
      column = 0; // Reset column for new line
    } else {
      column++;
    }

    if (opening.includes(char)) {
      stack.push({ char, line, column }); // Push opening delimiters with their position
    } else if (closing.includes(char)) {
      if (stack.length === 0) {
        return { delimiter: char, line, col: column }; // Unmatched closing delimiter
      }
      const lastOpening = stack.pop(); // Pop the last opening delimiter
      if (matching[lastOpening.char] !== char) {
        return { delimiter: lastOpening.char, line: lastOpening.line, col: lastOpening.column }; // Mismatched delimiter
      }
    }
  }

  if (stack.length > 0) {
    const unmatched = stack[stack.length - 1];
    return { delimiter: unmatched.char, line: unmatched.line, col: unmatched.column }; // Unclosed delimiter
  }

  return false; // All delimiters are properly closed
}
