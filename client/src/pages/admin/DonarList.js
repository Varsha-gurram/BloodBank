import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { ProgressBar } from "react-loader-spinner";

const DonarList = () => {
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState(false);

  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/admin/donar-list");
      if (data?.success) {
        setData(data?.donarData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTemp(false);
    }
  };

  useEffect(() => {
    setTemp(true);
    getDonars();
  }, []);

  //DELETE FUNCTION
  const handelDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are You Sure Want To Delete This Donor?",
        "Sure"
      );
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-donar/${id}`);
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {temp ? (
        <div className="d-flex justify-content-center align-items-center">
          <ProgressBar
            visible={true}
            height="200"
            width="200"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="container mt-4" style={{
          background: "#f7f9fc",
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(52,71,103,0.08)",
          padding: "2rem 1.5rem",
        }}>
          <h3 className="mb-4" style={{ color: "#344767", fontWeight: 700 }}>
            <i className="fa-solid fa-users me-2"></i>
            Donor List
          </h3>
          <table className="table" style={{
            borderRadius: "12px",
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(52,71,103,0.06)",
          }}>
            <thead>
              <tr style={{ background: "#eaf1fb" }}>
                <th style={{ color: "#344767", fontWeight: 600 }}>Name</th>
                <th style={{ color: "#344767", fontWeight: 600 }}>Email</th>
                <th style={{ color: "#344767", fontWeight: 600 }}>Phone</th>
                <th style={{ color: "#344767", fontWeight: 600 }}>Date</th>
                <th style={{ color: "#344767", fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr
                  key={record._id}
                  style={{
                    transition: "background 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f4f6fb"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}
                >
                  <td style={{ fontWeight: 500 }}>
                    {record.name ? (
                      <span>
                        <i className="fa-solid fa-user me-2" style={{ color: "#1976d2" }}></i>
                        {record.name}
                      </span>
                    ) : (
                      <span style={{ color: "#1976d2", fontWeight: 600 }}>
                        <i className="fa-solid fa-building me-2"></i>
                        {record.organisationName} (ORG)
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{
                      padding: "0.35em 0.9em",
                      borderRadius: "12px",
                      fontWeight: 600,
                      color: "#fff",
                      background: "linear-gradient(90deg,#98D8FF,#344767)",
                      fontSize: "0.98rem"
                    }}>
                      {record.email}
                    </span>
                  </td>
                  <td style={{ fontSize: "0.98rem" }}>{record.phone}</td>
                  <td style={{ fontSize: "0.98rem" }}>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                  <td>
                    <button
                      className="btn"
                      style={{
                        background: "linear-gradient(90deg,#c62828,#FF8080)",
                        color: "#fff",
                        fontWeight: 600,
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px #eaf1fb",
                        padding: "0.4rem 1.2rem"
                      }}
                      onClick={() => handelDelete(record._id)}
                    >
                      <i className="fa-solid fa-trash me-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default DonarList;