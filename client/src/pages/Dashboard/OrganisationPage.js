import React, { useEffect, useState } from "react";
import Layout from "./../../components/shared/Layout/Layout";
import moment from "moment";
import { useSelector } from "react-redux";
import API from "../../services/API";
import { ProgressBar } from "react-loader-spinner";

const OrganisationPage = () => {
  // get current user
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [temp, setTemp] = useState(false);

  //find org records
  const getOrg = async () => {
    try {
      if (user?.role === 'donar') {
        const { data } = await API.get("/inventory/get-organisation");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
      if (user?.role === "hospital") {
        const { data } = await API.get("/inventory/get-organisation-for-hospital");
        if (data?.success) {
          setData(data?.organisations);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTemp(false);
    }
  };

  useEffect(() => {
    setTemp(true);
    getOrg();
  }, [user]);

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
          <h3 className="mb-4" style={{ color: "#344767", fontWeight: 700 }}>Organisation Records</h3>
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
                <th style={{ color: "#344767", fontWeight: 600 }}>Address</th>
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
                  <td style={{ fontWeight: 500 }}>{record.organisationName}</td>
                  <td style={{ fontSize: "0.98rem" }}>{record.email}</td>
                  <td style={{ fontSize: "0.98rem" }}>{record.phone}</td>
                  <td style={{ fontSize: "0.98rem" }}>{record.address}</td>
                  <td style={{ fontSize: "0.98rem" }}>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default OrganisationPage;