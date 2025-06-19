import React, { useState, useEffect } from "react";
import axios from "axios";
import sentPhoto from "./img/sent.png";
import { Link } from "react-router-dom";

function MainDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  axios
    .get("http://localhost:5081/api/Doctors")
    .then((response) => {
      console.log("Doktorët:", response.data);
      setDoctors(response.data);
    })
    .catch((error) =>
      console.error("Gabim gjatë marrjes së doktorëve:", error)
    );
}, []);


  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`http://localhost:5081/api/Doctors/${deleteId}`);
      setDoctors(doctors.filter((d) => d.doctorId !== deleteId));
      setDeleteId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Gabim gjatë fshirjes së doktorit:", error);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-4 col-3">
              <h4 className="page-title">Doctors</h4>
            </div>
            <div className="col-sm-8 col-9 text-right m-b-20">
              <Link to="/add-doctor" className="btn btn-primary btn-rounded">
                <i className="fa fa-plus"></i> Add Doctor
              </Link>
            </div>
          </div>

          <div className="row doctor-grid">
            {Array.isArray(doctors) && doctors.length > 0 ? (
              doctors.map((item, index) => (
                <div className="col-md-4 col-sm-4 col-lg-3" key={index}>
                  <div className="profile-widget">
                    <div className="doctor-img">
                      <a className="avatar">
                        <img
                          src={`http://localhost:5081/Images/${item.avatar}`}
                          alt="Doctor Avatar"
                        />
                      </a>
                    </div>
                    <div className="dropdown profile-action">
                      <a
                        href="#"
                        className="action-icon dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa fa-ellipsis-v"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                      

                      {/* <Link
  to={`/edit-doctor/${item.doctorId}`} 
  className="btn btn-sm btn-info"
>
  <i className="fa fa-pencil m-r-5"></i>Edit
</Link> */}


                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setDeleteId(item.doctorId);
                            setShowModal(true);
                          }}
                        >
                          <i className="fa fa-trash-o m-r-5"></i> Delete
                        </button>
                      </div>
                    </div>
                    <h4 className="doctor-name text-ellipsis">
                      {item.firstName} {item.lastName}
                    </h4>
                    <div className="doc-prof">
                      {item.departament?.departamentName || "N/A"}
                    </div>
                    <div>
                      <small>
                        Orari: {item.workingHoursStart} - {item.workingHoursEnd}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Nuk ka doktorë për t'u shfaqur.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal për fshirje */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <img src={sentPhoto} alt="" width="50" height="46" />
                  <h3>Are you sure you want to delete this doctor?</h3>
                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-white"
                      onClick={() => {
                        setShowModal(false);
                        setDeleteId(null);
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDelete}
                      autoFocus
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Modal backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}

export default MainDoctor;
