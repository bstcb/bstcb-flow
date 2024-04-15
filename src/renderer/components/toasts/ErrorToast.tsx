import { useEffect } from "react"

const ErrorToast = (props: { message: string, isTriggered: boolean }) => {
   useEffect(() => {

   }, [props.isTriggered])
   return <div className="alert alert-danger toast__alert" role="alert">
      {props.message}
   </div>


}

export default ErrorToast
