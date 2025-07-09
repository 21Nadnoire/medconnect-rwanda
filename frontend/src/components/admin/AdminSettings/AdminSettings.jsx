import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminSettings = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/api/admin/settings");
        setSettings(response.data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="admin-settings">
      <h2>Admin Settings</h2>
      <form>
        <div>
          <label>Site Title</label>
          <input
            type="text"
            value={settings.siteTitle || ""}
            onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
          />
        </div>
        <div>
          <label>Site Description</label>
          <textarea
            value={settings.siteDescription || ""}
            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default AdminSettings;
