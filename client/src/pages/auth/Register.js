import React from 'react'
import Form from '../../components/shared/Form/Form'
import { useSelector } from 'react-redux'
import { DNA } from 'react-loader-spinner'

const formWrapperStyle = {
  padding: "2rem 2.5rem 1.5rem 2.5rem",
  background: "rgba(255,255,255,0.92)",
  borderRadius: "14px",
  boxShadow: "0 4px 16px 0 rgba(106,55,2,0.08)",
  margin: "0 auto"
};

const Register = () => {
  const { loading, error } = useSelector(state => state.auth)
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(135deg, #ffe4c2 0%, #ffd6b0 100%)",
        minHeight: "100vh",
      }}
    >
      <div style={{ width: "100%", maxWidth: 540 }}>
        {!loading && (
          <div className="text-center mb-2">
            <h2 style={{
              color: "#6a3702",
              fontWeight: 700,
              marginBottom: 8,
              fontSize: "1.5rem"
            }}>Create Account</h2>
            <p style={{
              color: "#a67c52",
              marginBottom: 18,
              fontSize: "1rem"
            }}>
              Join our blood bank community!
            </p>
          </div>
        )}
        {loading ? (
          <div className="d-flex w-100 align-items-center justify-content-center" style={{ minHeight: 120 }}>
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          <div style={formWrapperStyle}>
            <Form formTitle={""} submitBtn={"Register"} formType={'register'} />
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-2" style={{
            width: "100%",
            textAlign: "center",
            fontSize: "0.95rem"
          }}>
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
export default Register