const ErrorToast = (props: { message: string }) => {
   return <div className="alert alert-danger toast__alert" role="alert">
      {props.message}
   </div>


}

export default ErrorToast
