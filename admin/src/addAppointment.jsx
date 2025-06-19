  import Header from "./header.jsx";
  import React, { useState, useEffect } from "react";
  import SideBar from "./sideBar.jsx";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";

  function AddAppointment() {
    const [name, setName] = useState("");

    const [departments, setDepartments] = useState([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");


    const navigate = useNavigate();


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

  if (!name || !appointmentDate || !appointmentTime || !selectedDoctorId || !selectedDepartmentId) {
    alert("Ju lutem plotësoni të gjitha fushat.");
    return;
  }

  const selectedDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
  const now = new Date();

  if (selectedDateTime < now) {
    alert("Nuk mund të caktoni takim në të kaluarën.");
    return;
  }

  const dataToSend = {
    name: name,
    appointmentDate: appointmentDate,
    appointmentTime: appointmentTime + ":00",
    doctorId: selectedDoctorId,
    departamentId: selectedDepartmentId,
  };

  console.log("Të dhënat që po dërgohen:", dataToSend);

  try {
    const response = await axios.post("http://localhost:5081/api/Appointment", dataToSend);
    console.log("Përgjigja nga serveri:", response.data);
    alert("Takimi u shtua me sukses!");
    navigate("/appointments");
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      console.log("Gabim nga serveri:", data);
      if (data.errors) {
        for (const field in data.errors) {
          console.error(`${field}: ${data.errors[field].join(", ")}`);
        }
      }
      alert("Gabim gjatë shtimit të takimit.");
    }
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
                <h4 className="page-title">Add Appointment</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <form  onSubmit={handleSubmit} >
                  
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Patient Name</label>
                        <input
                          type="text"
                          placeholder="Name"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                    
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
                          {departments.map((d) => (
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
                          {doctors.map((d) => (
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
    value={appointmentDate}
    onChange={(e) => setAppointmentDate(e.target.value)}
    required
  />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Time</label>
                      <input
    type="time"
    className="form-control"
    value={appointmentTime}
    onChange={(e) => setAppointmentTime(e.target.value)}
    required
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

  export default AddAppointment;
