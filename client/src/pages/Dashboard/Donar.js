import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from "../../services/API";
import moment from 'moment';
import { ProgressBar } from "react-loader-spinner";

const Donar = () => {
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState(false);

  //find donar records
  const getDonars = async () => {
    try {
      const { data } = await API.get("/inventory/get-donars");
      if (data?.success) {
        setData(data?.donars);
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
          <h3 className="mb-4" style={{ color: "#344767", fontWeight: 700 }}>Donor Records</h3>
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
                    {record.name || (
                      <span style={{ color: "#1976d2", fontWeight: 600 }}>
                        {record.organisationName} (ORG)
                      </span>
                    )}
                  </td>
                  <td style={{ fontSize: "0.98rem" }}>{record.email}</td>
                  <td style={{ fontSize: "0.98rem" }}>{record.phone}</td>
                  <td style={{ fontSize: "0.98rem" }}>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}

export default Donar