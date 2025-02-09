import { MutableRefObject } from "react"
import { NODE_ERROR_CLASSNAME, TIMER_DURATION } from "../constants"
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
            autoClose: TIMER_DURATION,
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
            autoClose: TIMER_DURATION,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });

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
