import { useEffect, useState } from "react"
import { useStyleStore } from "../../store/StyleStore"

// TODO: make toast universal
const ErrorToast = (props: { message: string }) => {
   const [classes, setClasses] = useState(["alert", "alert-danger", "toast__alert"])
   useStyleStore.subscribe((state) => {
      setClasses(c => [...c, "active"])
      const timer = setTimeout(() => {
         setClasses(c => c.filter(e => e !== 'active'))
         console.log('timeout')
      }, 1000)
   })
   return <div className={classes.join(' ')} role="alert">
      {props.message}
   </div>


}

export default ErrorToast
