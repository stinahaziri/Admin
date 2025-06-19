// AddDepartament.jsx
import { useState } from "react";
import axios from "axios";
import Header from "./header.jsx";
import SideBar from "./sideBar.jsx";
import { useNavigate } from "react-router-dom";

function AddDepartament() {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("http://localhost:5081/api/Departament", {
      departamentName: name,
      isActive: active,
    });
    alert("Departamenti u shtua me sukses!");
    navigate("/department");
  } catch (error) {
    if (error.response) {
      const { data } = error.response;

      // Nese vjen error specifik qe tregon se emri ekziston
      if (
        data?.errors?.addDepartmentDto?.some(err =>
          err.toLowerCase().includes("already exists") ||
          err.toLowerCase().includes("ekziston")
        )
      ) {
       
      } else {
        alert("Egziston ky depaetament");
        console.error("Gabim i përgjithshëm:", data);
      }
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
              <h4 className="page-title">Add Department</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Department Name</label>
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="display-block">Department Status</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="product_active"
                      value="Active"
                      checked={active === true}
                      onChange={(e) => setActive(true)}
                    />
                    <label className="form-check-label" htmlFor="product_active">
                      Active
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="status"
                      id="product_inactive"
                      value="Inactive"
                      checked={active === false}
                      onChange={(e) => setActive(false)}
                    />
                    <label className="form-check-label" htmlFor="product_inactive">
                      Inactive
                    </label>
                  </div>
                </div>
                <div className="m-t-20 text-center">
                  <button type="submit" className="btn btn-primary submit-btn">
                    Create Department
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-overlay" data-reff=""></div>
    </>
  );
}
export default AddDepartament;
