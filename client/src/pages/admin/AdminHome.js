import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container p-3">
        <div className="d-flex flex-column mt-4" style={{
          background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(52,71,103,0.10)",
          padding: "2.5rem 2rem"
        }}>
          <h1>
            Welcome Admin <span className="text-success">{user?.name}</span>
          </h1>
          <h3 className="mt-4">Blood Bank Management Dashboard</h3>
          <hr />
          <p style={{ fontSize: "1.08rem", color: "#344767" }}>
            As an <b>Admin</b>, you have full control over the Blood Bank Management System.
            <br /><br />
            <ul>
              <li>Monitor and manage blood inventory across all hospitals and organisations.</li>
              <li>View, add, and update donor, hospital, and organisation records.</li>
              <li>Track recent blood donations and usage logs in real-time.</li>
              <li>Ensure data accuracy and system security for all users.</li>
              <li>Generate analytics and reports for blood group availability and trends.</li>
            </ul>
            <br />
            Use the sidebar to navigate between dashboards, manage users, and review blood logs. 
            <br /><br />
            <b>Thank you for keeping lives safe!</b>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;