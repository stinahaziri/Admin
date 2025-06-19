import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userPlaceholder from "./img/user.jpg";

function MainAddDoctor() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(userPlaceholder);
  const [workingHoursStart, setWorkingHoursStart] = useState("");
  const [workingHoursEnd, setWorkingHoursEnd] = useState("");

  const navigate = useNavigate();

useEffect(() => {
  axios
    .get("http://localhost:5081/api/Departament")

    .then((res) => {
       console.log("Doktorët e marrë:", res.data);
      setDepartments(res.data.$values || res.data); // në varësi të formatit që kthen backend-i
    })
    .catch((err) => {
      console.error("Gabim gjatë marrjes së departamenteve", err);
    });
}, [])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(userPlaceholder);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatarFile) {
      alert("Ju lutem ngarkoni një avatar.");
      return;
    }

    const formData = new FormData();
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("DepartmentId", selectedDepartmentId);
    formData.append("WorkingHoursStart", workingHoursStart);
    formData.append("WorkingHoursEnd", workingHoursEnd);
    formData.append("AvatarFile", avatarFile);

    try {
      await axios.post("http://localhost:5081/api/Doctors/upload-avatars", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Doktori u shtua me sukses!");
      navigate("/doctors");
    } catch (error) {
      console.error("Gabim gjatë shtimit të doktorit:", error);
      alert("Gabim gjatë shtimit të doktorit.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h4 className="page-title">Add Doctor</h4>
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
                    <div className="upload-img" style={{ marginBottom: "10px" }}>
                      <img
                        src={avatarPreview}
                        alt="avatar preview"
                        style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                      />
                    </div>
                    <div className="upload-input">
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleAvatarChange}
                        accept="image/*"
                        required
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
                  Create Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainAddDoctor; 