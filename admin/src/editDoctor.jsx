import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header.jsx";
import SideBar from "./sideBar.jsx";
import userPlaceholder from "./img/user.jpg";

function EditDoctor() {
  const { id } = useParams();
  console.log("ID e doktorit:", id);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(userPlaceholder);
  const [workingHoursStart, setWorkingHoursStart] = useState("09:44:55");
  const [workingHoursEnd, setWorkingHoursEnd] = useState("09:44:35");

  
  useEffect(() => {
    // Merr doktorin për editim
    axios
      .get(`http://localhost:5081/api/Doctors/${id}`)
      .then((res) => {
        const doctor = res.data;
        setFirstName(doctor.firstName);
        setLastName(doctor.lastName);
        setSelectedDepartmentId(doctor.departmentId);
        setWorkingHoursStart(doctor.workingHoursStart);
        setWorkingHoursEnd(doctor.workingHoursEnd);
        setAvatarPreview(
          doctor.avatar
            ? `http://localhost:5081/Images/${doctor.avatar}`
            : userPlaceholder
        );
      })
      .catch((err) => {
        console.error("Gabim gjatë marrjes së doktorit:", err);
      });

    // Merr departamentet
    axios
      .get("http://localhost:5081/api/Departament")
      .then((res) => {
        setDepartments(res.data.$values || res.data);
      })
      .catch((err) => {
        console.error("Gabim gjatë marrjes së departamenteve:", err);
      });
  }, [id]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("departmentId", selectedDepartmentId);
console.log("workingHoursStart", workingHoursStart); // duhet të shfaqe "09:00:00"
console.log("workingHoursEnd", workingHoursEnd)
    // Shto sekondat për formatin "HH:mm:ss" që .NET pret si TimeSpan
    formData.append("workingHoursStart", workingHoursStart);
    formData.append("workingHoursEnd", workingHoursEnd);

    if (avatarFile) {
      formData.append("avatarFile", avatarFile);
    }

    const response = await axios.put(
      `http://localhost:5081/api/Doctors/update-with-avatar/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    console.log("Doctor updated successfully", response.data);
    navigate("/doctors");
  } catch (error) {
    console.error("Gabim gjatë përditësimit të doktorit:", error);
  }
};




  return (
    <>
      <Header />
      <SideBar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h4 className="page-title">Edit Doctor</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
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
                  <div className="col-sm-6">
                    <label>Avatar</label>
                    <div className="profile-upload">
                      <div
                        className="upload-img"
                        style={{ marginBottom: "10px" }}
                      >
                        <img
                          src={avatarPreview}
                          alt="avatar preview"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                      <div className="upload-input">
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleAvatarChange}
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label>Orari Prej:</label>
                    <input
                      type="time"
                      className="form-control"
                      value={workingHoursStart}
                      onChange={(e) => setWorkingHoursStart(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-sm-6">
                    <label>Orari Deri:</label>
                    <input
                      type="time"
                      className="form-control"
                      value={workingHoursEnd}
                      onChange={(e) => setWorkingHoursEnd(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary">
                    Update Doctor
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

export default EditDoctor;
