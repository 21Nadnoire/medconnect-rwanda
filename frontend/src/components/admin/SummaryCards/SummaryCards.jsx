import React, { useState, useEffect } from "react";
import axios from "axios";

const SummaryCards = () => {
  const [summary, setSummary] = useState({ totalPatients: 0, totalDoctors: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("/api/admin/summary");
        setSummary(response.data);
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Total Patients</h3>
        <p>{summary.totalPatients}</p>
      </div>
      <div className="card">
        <h3>Total Doctors</h3>
        <p>{summary.totalDoctors}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
