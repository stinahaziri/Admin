import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header.jsx";
import SideBar from "./sideBar.jsx";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

  function EditAppointment() {
    const { id } = useParams();
    const [name, setName] = useState("");

    const [departments, setDepartments] = useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
   const navigate = useNavigate();

     useEffect(() => {
    axios.get(`http://localhost:5081/api/Appointment/${id}`).then((res) => {
      const data = res.data;
    
      setName(data.name);
      setAppointmentDate(data.appointmentDate.split("T")[0]);
      setAppointmentTime(data.appointmentTime);

      setSelectedDoctorId(data.selectedDoctorId)
      setSelectedDepartmentId(data.selectedDepartmentId);
    });
  }, [id]);


    useEffect(() => {
  axios
    .get("http://localhost:5081/api/Departament")

    .then((res) => {
       console.log("departamenti e marrë:", res.data);
      setDepartments(res.data.$values || res.data); // në varësi të formatit që kthen backend-i
    })
     axios
    .get("http://localhost:5081/api/Doctors")

    .then((res) => {
       console.log("doktorri e marrë:", res.data);
      setDoctors(res.data.$values || res.data); // në varësi të formatit që kthen backend-i
    })
    .catch((err) => {
      console.log("Gabim nga API:", err.response.data.errors);
    });
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: name,
      AppointmentDate: appointmentDate,      
      AppointmentTime: appointmentTime,

      DoctorId: selectedDoctorId,
      DepartamentId: selectedDepartmentId,
    };

    try {
      await axios.put(`http://localhost:5081/api/Appointment/${id}`, payload);
      navigate("/appointments");
    } catch (err) {
      console.error("Error updating department", err);
    }

  };
    return (
      <>
        <SideBar />
        <Header />
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <h4 className="page-title">Edit Appointment</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form onSubmit={handleSubmit}>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Patient Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name || ""} placeholder={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Department</label>

                        <select
                          className="form-control"
                          value={selectedDepartmentId}
                          onChange={(e) => setSelectedDepartmentId(e.target.value)}
                          required
                        >
                          <option value="">-- Zgjedh një departament --</option>
                          {Array.isArray(departments) && departments.map((d)  => (
                            <option key={d.id} value={d.id}>
                              
                              {d.departamentName}
                            </option>
                          ))}
                        </select>

                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Doctor</label>
                         <select
                          className="form-control"
                          value={selectedDoctorId}
                          onChange={(e) => setSelectedDoctorId(e.target.value)}
                          required
                        >
                          <option value="">-- Zgjedh një doktor --</option>
                          {Array.isArray(doctors) && doctors.map((d) => (
                            <option  key={d.doctorId} value={d.doctorId} >
                              
                              {d.firstName}
                            </option>
                          ))} 
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Date</label>
                    <input
                      type="date"
                      className="form-control"
                          value={appointmentDate} placeholder={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
 
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Time</label>
                      <input
                         type="time"
                        className="form-control"
                          value={appointmentTime} placeholder={appointmentTime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
  
                        />

                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button  type="submit" className="btn btn-primary submit-btn">
                      Create Appointment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default EditAppointment;
