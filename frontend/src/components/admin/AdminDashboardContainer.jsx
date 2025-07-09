import React from "react";

const AdminDashboardContainer = ({ searchQuery, setSearchQuery }) => {
  const [notifications, setNotifications] = React.useState([
    { id: 1, message: "New user registration" },
    { id: 2, message: "System update available" },
    { id: 3, message: "Password change request" },
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mt-4">
      {/* User | Admin Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <span className="badge bg-primary me-2">Admin</span>
          <span className="fs-5">Welcome, Admin</span>
        </div>
        <div>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              id="notificationDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Notifications ({notifications.length})
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="notificationDropdown"
              style={{ right: 0, left: "auto" }}
            >
              {notifications.map((notification) => (
                <li key={notification.id}>
                  <button
                    className="dropdown-item"
                    onClick={() => alert(`Notification clicked: ${notification.message}`)}
                  >
                    {notification.message}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-3">
        <label htmlFor="search" className="form-label">
          Search Users
        </label>
        <input
          type="text"
          id="search"
          className="form-control"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default AdminDashboardContainer;
