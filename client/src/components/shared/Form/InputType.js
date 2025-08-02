import React from 'react'

const InputType = ({ labelText, lableForm, inputType, value, onChange, name }) => {
  return (
    <div className="form-outline mb-4" style={{
      position: "relative",
      background: "rgba(255,255,255,0.85)",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(52,71,103,0.09)",
      padding: "1rem 1.2rem",
      marginBottom: "1.2rem"
    }}>
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control form-control-lg"
        id={lableForm}
        style={{
          border: "none",
          background: "transparent",
          fontSize: "1.08rem",
          color: "#344767",
          fontWeight: 500,
          boxShadow: "none",
        }}
        autoComplete="off"
      />
      <label
        className="form-label"
        htmlFor={lableForm}
        style={{
          position: "absolute",
          top: "-12px",
          left: "18px",
          background: "linear-gradient(90deg,#e0eafc,#cfdef3)",
          padding: "0 8px",
          borderRadius: "8px",
          fontSize: "0.98rem",
          color: "#344767",
          fontWeight: 600,
          letterSpacing: "0.5px"
        }}
      >
        {labelText}
      </label>
    </div>
  )
}

export default InputType