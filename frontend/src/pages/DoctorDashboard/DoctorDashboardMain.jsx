import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import { FaUserInjured, FaStar } from "react-icons/fa";

const DoctorDashboardMain = ({ doctor }) => {
  const darkBlue = "#003366";

  return (
    <div className="container-fluid py-4">
      {/* Top Row: Patients Treated and Ratings */}
      <div className="row mb-4">
        {/* Patients Treated */}
        <div className="col-md-6 mb-3">
          <Card
            className="shadow-sm bg-white text-dark border border-primary"
            style={{ width: "180px", minWidth: "150px" }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center px-3 py-2">
              <div>
                <Card.Title
                  className="fw-bold mb-1"
                  style={{ fontSize: "13px", color: darkBlue }}
                >
                  Patients Treated
                </Card.Title>
                <h6 className="mb-0" style={{ fontSize: "15px", color: darkBlue }}>
                  152
                </h6>
              </div>
              <FaUserInjured size={22} color={darkBlue} />
            </Card.Body>
          </Card>
        </div>

        {/* Ratings */}
        <div className="col-md-6 mb-3">
          <Card
            className="shadow-sm bg-white text-dark border border-primary"
            style={{ width: "180px", minWidth: "150px" }}
          >
            <Card.Body className="d-flex justify-content-between align-items-center px-3 py-2">
              <div>
                <Card.Title
                  className="fw-bold mb-1"
                  style={{ fontSize: "13px", color: darkBlue }}
                >
                  Ratings
                </Card.Title>
                <h6 className="mb-0" style={{ fontSize: "15px", color: darkBlue }}>
                  4.7 / 5
                </h6>
              </div>
              <FaStar size={22} color={darkBlue} />
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Mid-size Tables */}
      <div className="row mb-4">
        {/* Left Column: Appointment Requests */}
        <div className="col-md-6 mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">Appointment Requests</Card.Title>
              <Table striped hover size="sm" className="mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Disease</th>
                    <th>Date</th>
                    <th>Approval</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Jane Doe</td>
                    <td>Fever</td>
                    <td>Apr 17</td>
                    <td>
                      <Button variant="outline-success" size="sm">Approve</Button>
                      <Button variant="outline-danger" size="sm" className="ms-2">Reject</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>John Smith</td>
                    <td>Cough</td>
                    <td>Apr 18</td>
                    <td>
                      <Button variant="outline-success" size="sm">Approve</Button>
                      <Button variant="outline-danger" size="sm" className="ms-2">Reject</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="text-end">
                <Button variant="outline-primary" size="sm">See More</Button>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Right Column: Most Visiting Clients */}
        <div className="col-md-6 mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">Most Visiting Clients</Card.Title>
              <Table striped hover size="sm" className="mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Disease</th>
                    <th>Visited</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Linda Grace</td>
                    <td>Diabetes</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Alex Mbaraga</td>
                    <td>Hypertension</td>
                    <td>4</td>
                  </tr>
                </tbody>
              </Table>
              <div className="text-end">
                <Button variant="outline-primary" size="sm">See More</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">Monthly Visits Chart</Card.Title>
              <div className="text-muted">[Chart Placeholder]</div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6 mb-3">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-primary fw-bold">Announcements</Card.Title>
              <p className="mt-2">📢 Upcoming training on AI-assisted diagnosis next week.</p>
              <p>📌 Weekly team meeting every Friday at 2PM.</p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardMain;
