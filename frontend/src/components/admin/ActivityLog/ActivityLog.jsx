import React, { useEffect, useState } from "react";

const ActivityLog = () => {
  const [activityLog, setActivityLog] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/activity-log');  // Updated URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setActivityLog(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (error) {
        console.error('Error fetching activity log:', error);
        setError('Failed to fetch activity logs');
        setActivityLog([]); // Fallback to empty array if error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="activity-log">
      {error && <p className="error">{error}</p>} {/* Show error if any */}
      {activityLog.length > 0 ? (
        activityLog.map((item, index) => (
          <div key={index} className="log-item">
            {/* Customize the log item structure */}
            <p>User ID: {item.user_id}</p>
            <p>Action: {item.action}</p>
            <p>Timestamp: {new Date(item.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No activity logs available.</p>
      )}
    </div>
  );
};

export default ActivityLog;
