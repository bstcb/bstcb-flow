import { MutableRefObject } from "react"
import { NODE_ERROR_CLASSNAME } from "../constants"

export enum NodeErrorKind {
  NEK_WRONG_DATA_FORMAT = "wrong data format"
}

export class NodeError {

  static show(nodeType: string, nodeIndex: number, errorKind: NodeErrorKind, errorMessage: string) {
    alert(`[ERROR]: ${errorKind}: ${errorMessage} in ${nodeType} node at position ${nodeIndex}`)
  }

  static applyErrorStyle(ref: MutableRefObject<HTMLInputElement>) {
    if (!ref.current.className.includes(NODE_ERROR_CLASSNAME))
      ref.current.className = NODE_ERROR_CLASSNAME
  }


  static clearErrorStyle(ref: MutableRefObject<HTMLInputElement>) {
    if (ref.current.className.includes(NODE_ERROR_CLASSNAME))
      ref.current.className = ''
  }

}



