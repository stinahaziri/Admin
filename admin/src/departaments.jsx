import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header.jsx";
import SideBar from "./sideBar.jsx";
import sentPhoto from "./img/sent.png";
import { Link } from "react-router-dom";

function Department() {
  const [departament, setDepartament] = useState([]);
  const [deleteId, setDeleteId] = useState(null);


useEffect(() => {
  axios
    .get("http://localhost:5081/api/Departament")
    .then((res) => {
      console.log("API response:", res.data);
      setDepartament(res.data);
    })
    .catch((err) => {
      console.error("Failed to fetch departament:", err);
    });
}, []);


//delete
const handleDelete = async () => {
  if (!deleteId) return;

  try {
    await axios.delete(`http://localhost:5081/api/Departament/${deleteId}`);
    setDepartament(departament.filter(d => d.id !== deleteId));
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
            <div className="col-sm-5 col-5">
              <h4 className="page-title">Departments</h4>
            </div>

            <div className="col-sm-7 col-7 text-right mb-3">
              <Link to="/add-departament" className="btn btn-primary btn-rounded">
                <i className="fa fa-plus"></i> Add Department
              </Link>
            </div>
            
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped custom-table mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Department Name</th>
                      <th>Status</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {departament.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.departamentName}</td>
                        
                        <td>
                          <span
                            className={
                              item.isActive === false
                                ? "custom-badge status-red"
                                : "custom-badge status-green"
                            }
                          >
                            {item.isActive===false
                            ?"Inactive"
                          :"Active"}
                            
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="dropdown dropdown-action">
                            <a
                              href="#"
                              className="action-icon dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              <i className="fa fa-ellipsis-v"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <Link to={`/edit-departament/${item.id}`} className="dropdown-item">
                                <i className="fa fa-pencil m-r-5"></i> Edit
                              </Link>
                              <a
                                className="dropdown-item"
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#delete_department"
                                onClick={() => setDeleteId(item.id)}
                              >
                                <i className="fa fa-trash-o m-r-5"></i> Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* {departament.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">No departments found.</td>
                      </tr>
                    )} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        id="delete_department"
        className="modal fade delete-modal"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <img src={sentPhoto} alt="" width="50" height="46" />
              <h3>Are you sure you want to delete this Department?</h3>
              <div className="mt-3">
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
    </>
  );
}

export default Department;
