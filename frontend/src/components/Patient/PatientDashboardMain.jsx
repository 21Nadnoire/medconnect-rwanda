import React from "react";
import { Card, Button, Table } from "react-bootstrap";
import { FaCalendarCheck, FaNotesMedical, FaUserMd, FaBullhorn } from "react-icons/fa";

const PatientDashboardMain = () => {
  return (
    <div className="px-4 py-4 bg-light min-vh-100">
      <h4 className="mb-4 fw-semibold text-dark">Your Health at a Glance</h4>

      {/* Top Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <Card className="h-100 shadow-sm card-hover border-start border-primary border-4">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <FaCalendarCheck size={28} className="text-primary mb-3" />
                <Card.Title className="fw-bold">Upcoming Appointments</Card.Title>
                <Card.Text className="text-muted">2 appointments scheduled this week.</Card.Text>
              </div>
              <Button variant="primary" size="sm">View</Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="h-100 shadow-sm card-hover border-start border-success border-4">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <FaNotesMedical size={28} className="text-success mb-3" />
                <Card.Title className="fw-bold">Medical Records</Card.Title>
                <Card.Text className="text-muted">Access your latest health records.</Card.Text>
              </div>
              <Button variant="success" size="sm">View</Button>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="h-100 shadow-sm card-hover border-start border-warning border-4">
            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <FaUserMd size={28} className="text-warning mb-3" />
                <Card.Title className="fw-bold">Your Doctors</Card.Title>
                <Card.Text className="text-muted">See doctors assigned to your care.</Card.Text>
              </div>
              <Button variant="warning" size="sm">View</Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Appointment Requests and Announcements */}
      <div className="row g-4">
        <div className="col-md-8">
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Recent Appointment Requests</Card.Header>
            <Card.Body className="p-0">
              <Table striped hover responsive className="mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Apr 18, 2025</td>
                    <td>Dr. Mukamana</td>
                    <td className="text-success">Approved</td>
                  </tr>
                  <tr>
                    <td>Apr 22, 2025</td>
                    <td>Dr. Habimana</td>
                    <td className="text-warning">Pending</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer className="text-end">
              <Button variant="outline-primary" size="sm">See More</Button>
            </Card.Footer>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="shadow-sm">
            <Card.Header className="fw-bold"><FaBullhorn className="me-2" />Announcements</Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <strong>🩺 Free Screening:</strong> Join our May wellness week for free screenings.
                </li>
                <li>
                  <strong>📢 New Feature:</strong> You can now chat with your doctors in real time!
                </li>
              </ul>
              <Button variant="outline-info" size="sm">View All</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardMain;
