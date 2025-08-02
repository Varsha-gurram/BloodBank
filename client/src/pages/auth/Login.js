import React from 'react'
import Form from '../../components/shared/Form/Form'
import { useSelector } from 'react-redux'
import { DNA } from 'react-loader-spinner'
import toast from 'react-hot-toast'

const Login = () => {
  const { loading, error } = useSelector(state => state.auth)
  return (
    <>
      {error && <span>{toast.error(error)}</span>}
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "transparent" }}>
        <div className="w-100" style={{ maxWidth: 400 }}>
          {!loading && (
            <div className="text-center mb-3">
              <img
                src="/logo.png" 
                alt="Logo"
                style={{ maxWidth: 120, marginBottom: 16 }}
              />
            </div>
          )}
          {loading ? (
            <div className="d-flex w-100 h-100 align-items-center justify-content-center">
              <DNA
                visible={true}
                height="200"
                width="200"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          ) : (
            <Form formTitle={"Log In"} submitBtn={"Login"} formType={'login'} />
          )}
        </div>
      </div>
    </>
  )
}

export default Login