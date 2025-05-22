import { MutableRefObject } from "react"
import { NODE_ERROR_CLASSNAME, TIMER_DURATION_MS } from "../constants"
import { useErrorStore } from "../store/ErrorStore"
import { toast, Bounce } from "react-toastify";

export enum ErrorKind {
  EK_WRONG_DATA_FORMAT = "wrong data format"
}

export class ErrorReporter {
  // Typescript dosen't have proper overloads :(
  static showShort(errorMessage: string) {
    toast.error(errorMessage, {
      position: "bottom-right",
      autoClose: TIMER_DURATION_MS,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

  static show(nodeType: string, nodeIndex: number, errorKind: ErrorKind, errorMessage: string) {
    const errorString = `${errorMessage} in ${nodeType.replace('_', '')} node at position ${nodeIndex}`
    toast.error(errorString, {
      position: "bottom-right",
      autoClose: TIMER_DURATION_MS,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  }

  static showUnbalancedNodeBlock(missingPart: 'start' | 'end', nodeType: NodeTokenKind, nodeIndex: number) {
    const errorString = `unbalacned block: ${nodeType.replace('_', '')} at position ${nodeIndex} missing corresponding ${missingPart} block`
    toast.error(errorString, {
      position: "bottom-right",
      autoClose: TIMER_DURATION_MS,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  }

  static showUnbalancedCodeBlock(delimiter: string, line: number, col: number) {
    const errorString = `unbalacned delimiter: ${delimiter} at position ${line}:${col}`
    toast.error(errorString, {
      position: "bottom-right",
      autoClose: TIMER_DURATION_MS,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

  }

  
  static applyErrorStyle(el: HTMLInputElement) {
    if (!el.classList.contains(NODE_ERROR_CLASSNAME))
      el.classList.add(NODE_ERROR_CLASSNAME)
  }

  static clearErrorStyle(el: HTMLInputElement) {
    if (el.classList.contains(NODE_ERROR_CLASSNAME))
      el.classList.remove(NODE_ERROR_CLASSNAME)
  }
}
