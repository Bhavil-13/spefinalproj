import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddEmployeeComponent.css';

const AddEmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      EmployeeService.getEmployeeById(id)
        .then((response) => {
          setEmployee(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      EmployeeService.updateEmployee(id, employee)
        .then(() => navigate('/employees'))
        .catch((error) => console.error(error));
    } else {
      EmployeeService.createEmployee(employee)
        .then(() => navigate('/employees'))
        .catch((error) => console.error(error));
    }
  };

  const renderTitle = () => (
    <h2 className="text-center">{id ? 'Update Employee' : 'Add Employee'}</h2>
  );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {renderTitle()}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-control"
                  placeholder="Enter first name"
                  value={employee.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-control"
                  placeholder="Enter last name"
                  value={employee.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="emailId" className="form-label">
                  Email Id:
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  className="form-control"
                  placeholder="Enter email ID"
                  value={employee.emailId}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <Link to="/employees" className="btn btn-danger">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;
