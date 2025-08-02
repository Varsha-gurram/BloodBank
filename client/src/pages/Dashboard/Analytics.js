import React, { useEffect, useState } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#98D8FF", "#FF8080", "#F8F0E5", "#F6FDC3",
    "#CDFAD5", "#CDF0EA", "#F6C6EA", "#DFCCFB"
  ];

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get('/inventory/get-recent-inventory');
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBloodRecords();
  }, [])

  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, []);

  return (
  <>
    <Header />
    <div
      style={{
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        minHeight: "100vh",
        padding: "2.5rem 0",
      }}
    >
      <div className="d-flex flex-row flex-wrap align-items-center justify-content-center">
        {data.map((record, i) => (
          <div
            key={record.bloodGroup}
            style={{
              width: "20rem",
              margin: "1.5rem",
              borderRadius: "22px",
              background: "rgba(255,255,255,0.7)",
              boxShadow: "0 8px 32px rgba(52,71,103,0.18)",
              backdropFilter: "blur(6px)",
              border: "1px solid #eaf1fb",
              overflow: "hidden",
              transition: "transform 0.2s",
              position: "relative",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <div style={{
              position: "absolute",
              top: 18,
              right: 18,
              fontSize: "2rem",
              opacity: 0.15,
            }}>
              <i className="fa-solid fa-droplet"></i>
            </div>
            <div style={{ padding: "2rem 1.5rem" }}>
              <h2 style={{
                background: "linear-gradient(90deg,#98D8FF,#CDFAD5)",
                color: "#344767",
                borderRadius: "10px",
                fontWeight: 800,
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "1.2rem",
                letterSpacing: 2,
                boxShadow: "0 2px 8px #eaf1fb",
              }}>
                {record.bloodGroup}
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ color: "#344767", fontWeight: 600 }}>Total In:</span>
                <span style={{ color: "#2e7d32", fontWeight: 700 }}>{record.totalIn} ml</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ color: "#344767", fontWeight: 600 }}>Total Out:</span>
                <span style={{ color: "#c62828", fontWeight: 700 }}>{record.totalOut} ml</span>
              </div>
            </div>
            <div style={{
              background: "linear-gradient(90deg,#344767,#98D8FF)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.15rem",
              borderRadius: "0 0 22px 22px",
              textAlign: "center",
              padding: "0.8rem 0",
              letterSpacing: 1,
              boxShadow: "0 -2px 8px #eaf1fb",
            }}>
              <i className="fa-solid fa-heart-pulse me-2"></i>
              Total Available: <span style={{ fontWeight: 800 }}>{record.availabeBlood} ml</span>
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-4 mb-5" style={{
        background: "rgba(255,255,255,0.85)",
        borderRadius: "22px",
        boxShadow: "0 8px 32px rgba(52,71,103,0.13)",
        padding: "2.5rem 2rem",
        maxWidth: "900px",
      }}>
        <h2 style={{
          color: "#344767",
          fontWeight: 800,
          marginBottom: "2rem",
          letterSpacing: 2,
          textAlign: "center",
        }}>
          <i className="fa-solid fa-clock-rotate-left me-2"></i>
          Recent Blood Logs
        </h2>
        <table className="table" style={{
          borderRadius: "14px",
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(52,71,103,0.09)",
        }}>
          <thead>
            <tr style={{ background: "#eaf1fb" }}>
              <th style={{ color: "#344767", fontWeight: 700, fontSize: "1.05rem" }}>Blood Group</th>
              <th style={{ color: "#344767", fontWeight: 700, fontSize: "1.05rem" }}>Inventory Type</th>
              <th style={{ color: "#344767", fontWeight: 700, fontSize: "1.05rem" }}>Quantity</th>
              <th style={{ color: "#344767", fontWeight: 700, fontSize: "1.05rem" }}>Donor Email</th>
              <th style={{ color: "#344767", fontWeight: 700, fontSize: "1.05rem" }}>Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr
                key={record._id}
                style={{
                  transition: "background 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#f4f6fb"}
                onMouseLeave={e => e.currentTarget.style.background = ""}
              >
                <td style={{ fontWeight: 600 }}>{record.bloodGroup}</td>
                <td>
                  <span style={{
                    padding: "0.35em 0.9em",
                    borderRadius: "12px",
                    fontWeight: 600,
                    color: "#fff",
                    background: record.inventoryType.toLowerCase() === 'in'
                      ? "linear-gradient(90deg,#2e7d32,#98D8FF)"
                      : "linear-gradient(90deg,#c62828,#FF8080)",
                  }}>
                    {record.inventoryType.toUpperCase()}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{record.quantity} ml</td>
                <td style={{ fontSize: "0.98rem" }}>{record.email}</td>
                <td style={{ fontSize: "0.98rem" }}>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);
};
export default Analytics;