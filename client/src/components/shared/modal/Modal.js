import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  // handle modal data
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please Provide All Fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
      window.location.reload();
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content" style={{
            borderRadius: "18px",
            boxShadow: "0 8px 32px rgba(52,71,103,0.13)",
            background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
            border: "none"
          }}>
            <div className="modal-header" style={{
              borderBottom: "none",
              background: "linear-gradient(90deg,#98D8FF,#CDFAD5)",
              borderRadius: "18px 18px 0 0"
            }}>
              <h1 className="modal-title fs-5" id="staticBackdropLabel" style={{ color: "#344767", fontWeight: 700 }}>
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body" style={{ padding: "2rem 1.5rem" }}>
              <div className="d-flex mb-3 align-items-center">
                <span style={{ color: "#344767", fontWeight: 600 }}>Blood Type:</span>&nbsp;
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                    id="inRadio"
                  />
                  <label htmlFor="inRadio" className="form-check-label" style={{ fontWeight: 500 }}>
                    IN
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input"
                    id="outRadio"
                  />
                  <label htmlFor="outRadio" className="form-check-label" style={{ fontWeight: 500 }}>
                    OUT
                  </label>
                </div>
              </div>
              <select
                className="form-select mb-4"
                aria-label="Default select example"
                onChange={(e) => setBloodGroup(e.target.value)}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(52,71,103,0.09)",
                  fontWeight: 500,
                  color: "#344767"
                }}
              >
                <option defaultValue={"Open this select menu"}>
                  Select Blood Group
                </option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
              </select>
              <InputType
                labelText={"Email"}
                lableForm={"donarEmail"}
                inputType={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputType
                labelText={"Quanitity (ML)"}
                lableForm={"quantity"}
                inputType={"Number"}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="modal-footer" style={{
              borderTop: "none",
              background: "linear-gradient(90deg,#98D8FF,#CDFAD5)",
              borderRadius: "0 0 18px 18px"
            }}>
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                style={{
                  background: "#fff",
                  color: "#344767",
                  fontWeight: 600,
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px #eaf1fb",
                  padding: "0.5rem 1.5rem",
                  marginRight: "1rem"
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn"
                onClick={handleModalSubmit}
                style={{
                  background: "linear-gradient(90deg,#98D8FF,#CDFAD5)",
                  color: "#344767",
                  fontWeight: 700,
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px #eaf1fb",
                  padding: "0.5rem 1.5rem"
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;