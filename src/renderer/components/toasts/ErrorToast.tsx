import { useEffect, useState } from "react"
import { useErrorStore } from "../../store/ErrorStore"
import { DELETE_INITIAL_NODE_ERROR } from "../../constants"

// TODO: make toast universal
const ErrorToast = () => {
    const [classes, setClasses] = useState(["alert", "alert-danger", "toast__alert"])
    useErrorStore.subscribe((state) => {
        setClasses(c => [...c, "active"])
        setTimeout(() => {
            setClasses(c => c.filter(e => e !== 'active'))
            console.log('toast timeout')
        }, 5000)
        const storeTimer = setTimeout(() => {
            useErrorStore.getState().clearErrors()
            console.log('store timeout')
            clearTimeout(storeTimer)
        }, 5500)

    })
    // @TODO: fix multiple toast error
    return <>
        {useErrorStore.getState().isError &&
            <div className={classes.join(' ')} role="alert">
                {useErrorStore.getState().isDeleteNodeError && DELETE_INITIAL_NODE_ERROR}
                {useErrorStore.getState().isNodeDataFormatError !== '' && useErrorStore.getState().isNodeDataFormatError}
            </div>
        }
    </>


}

export default ErrorToast
