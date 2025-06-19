import { useEffect } from "react";
import Header from "./header.jsx";
import SideBar from "./sideBar.jsx";
import MainDoctor from "./mainDoctor.jsx";
import React from "react";
function Doctors() {

  return (
    <>
      <SideBar />
      <Header />
      <MainDoctor />
      <div id="delete_doctor" className="modal fade delete-modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <img src="assets/img/sent.png" alt="" width="50" />
              <h3>Are you sure you want to delete this Doctor?</h3>
              <div className="m-t-20">
                <a href="#" className="btn btn-white" data-bs-dismiss="modal">Cancel</a>
                <button type="submit" className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-overlay" data-reff=""></div>
    </>
  );
}

export default Doctors;
