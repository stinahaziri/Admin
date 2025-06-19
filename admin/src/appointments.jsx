import Header from "./header.jsx";
import SideBar from "./sideBar.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/logo.png";
import user from "./img/user.jpg";
import sentPhoto from "./img/sent.png";
import { Link } from "react-router-dom";


function Appointment() {
    const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departaments, setDepartaments] = useState([])
  const [deleteId, setDeleteId] = useState(null);
  
const [activePaymentStatus, setActivePaymentStatus] = useState({});
const togglePaymentStatus = (appointmentId) => {
  setActivePaymentStatus((prevState) => ({
    ...prevState,
    [appointmentId]: !prevState[appointmentId], // toggle për atë ID
  }));
};

    useEffect(() => {
  axios
    .get("http://localhost:5081/api/Appointment")
    .then((res) => {
      console.log("API response:", res.data);
      setAppointments(res.data);
      
    })
    .catch((err) => {
      console.error("Failed to fetch departament:", err);
    });
}, []);

useEffect(() => {
  axios
    .get("http://localhost:5081/api/Doctors")
    .then((res) => {
      setDoctors(res.data);
    })
    .catch((err) => {
      console.error("Failed to fetch doctors:", err);
    });
}, []);

useEffect(() => {
  axios
    .get("http://localhost:5081/api/Departament")
    .then((res) => {
      console.log("Shembull i nje departamenti:", res.data[0]);
      setDepartaments(res.data);
    })
    .catch((err) => {
      console.error("Failed to fetch departaments:", err);
    });
}, []);


const getDoctorName = (id) => {
  const doctor = doctors.find(doc => doc.doctorId === id);
  return doctor ? doctor.firstName + " " + doctor.lastName : "Unknown";
};


const getDepartamentName = (id) => {
  const dept = departaments.find(dep => dep.id === id);
  return dept ? dept.departamentName : "Unknown";
};

const handleDelete = async () => {
  if (!deleteId) return;

  try {
    await axios.delete(`http://localhost:5081/api/Appointment/${deleteId}`);
    setAppointments(appointments.filter(a => a.appointmentId !== deleteId));
    setDeleteId(null); // pastrimi
   
  } catch (error) {
    console.error("Error deleting department:", error);
  }
};

  return (
    <>
      <SideBar />
      <Header />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-4 col-3">
              <h4 className="page-title">Appointments</h4>
            </div>
            <div className="col-sm-8 col-9 text-right m-b-20">
             
              <Link to="/add-appointment"
                className="btn btn btn-primary btn-rounded float-right"
              >
                <i className="fa fa-plus"></i> Add Appointment
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped custom-table">
                  <thead>
                    <tr>
                      <th>Appointment ID</th>
                      <th>Patient Name</th>
                     
                      <th>Doctor Name</th>
                      <th>Department</th>
                      <th>Appointment Date</th>
                      <th>Appointment Time</th>
                      <th>Payment</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                   
                  <tbody>
                    {appointments.map((item, index) => (


                        <tr key={index}> 
                        <td >{item.appointmentId}</td>
                        <td>
                          {item.name}
                        </td>
                        
                            <td>{getDoctorName(item.doctorId)}</td>
                            <td>{getDepartamentName(item.departamentId)}</td>
                       
                        <td>{item.appointmentDate.split('T')[0]}</td>
                        
                        <td>{item.appointmentTime}</td>
                        <td>
                          <button
  className="payment-button"
  onClick={() => togglePaymentStatus(item.appointmentId)}
  style={{
    backgroundColor: activePaymentStatus[item.appointmentId] ? "#E5FAF3" : "#FFE5E6",
    color: activePaymentStatus[item.appointmentId] ? "#00CE7C" : "#FE0000",
    border: "none",
    borderRadius:"50px",
    padding:"7px 15px",
    cursor:"pointer",
  }}
>
  {activePaymentStatus[item.appointmentId] ? "✔" : "-"}
</button>

                        </td>
                        <td className="text-right">
                          <div className="dropdown dropdown-action">
                            <a
                              href="#"
                              className="action-icon dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                            <Link to={`/editAppointment/${item.appointmentId}`} className="dropdown-item">
                                <i className="fa fa-pencil m-r-5"></i> Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_appointment"
                                onClick={() => setDeleteId(item.appointmentId)}
                              >
                                <i className="fa fa-trash-o m-r-5"></i> Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                                       ))}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
       
        <div
          id="delete_appointment"
          className="modal fade delete-modal"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <img src={sentPhoto} alt="" width="50" height="46" />
                <h3>Are you sure want to delete this Appointment?</h3>
                <div className="m-t-20" style={{display:"flex",
                  justifyContent:"center" ,gap:"12px"}}>
                  {" "}
                  <a href="#" className="btn btn-white" data-bs-dismiss="modal">
                    Close
                  </a>
                      <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Appointment;
