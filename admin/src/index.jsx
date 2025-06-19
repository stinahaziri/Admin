
//css
import React from "react";
import Header from "./header.jsx";
import SideBar from "./sideBar.jsx";
import { useEffect,useState } from "react";
import axios from "axios";
import Department from "./departaments.jsx";
import { Link } from "react-router-dom";
// import  './js/Chart.bundle';
// import  './js/chart.js'; 
function Index() {

const[departamentCount,setDepartamentCount]=useState(0);
const[appointmentsCount,setAppointmentsCount]=useState(0);
const[doctorCount,setDoctorCount]=useState(0);

//countat
useEffect(()=>{
    axios.get("http://localhost:5081/api/Departament/count")
    .then(res=>{
        setDepartamentCount(res.data)
    })
    .catch(err=>{
        console.log("gabim haver");
        
    })
})
useEffect(()=>{
    axios.get("http://localhost:5081/api/Appointment/count")
    .then(res=>{
        setAppointmentsCount(res.data)
    })
    .catch(err=>{
        console.log("gabim haver");
        
    })
})
useEffect(()=>{
    axios.get("http://localhost:5081/api/Doctors/count")
    .then(res=>{
        setDoctorCount(res.data)
    })
    .catch(err=>{
        console.log("gabim haver");
        
    })
})
    return(
      

       <>
       <Header/>
       <SideBar/>
       <div id="root">     

        <div  className="page-wrapper">
            <div className="content">
                <div className="row">
                  
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                        <div className="dash-widget">
                            <span className="dash-widget-bg1"><i className="fa fa-user-o"></i></span>
                            <div className="dash-widget-info text-right">
                                <h3>{appointmentsCount}</h3>
                                <span className="widget-title1">Patients <i className="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                        <div className="dash-widget">
                            <span className="dash-widget-bg2"><i className="fa fa-user-md" aria-hidden="true"></i></span>
                            <div className="dash-widget-info text-right">
                                <h3>{doctorCount}</h3>
                                <span className="widget-title2">Doctors <i className="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                        <div className="dash-widget">
                            <span className="dash-widget-bg4"><i className="fa fa-heartbeat" aria-hidden="true"></i></span>
                            <div className="dash-widget-info text-right">
                                <h3>{departamentCount}</h3>
                                <span className="widget-title4">Departaments<i className="fa fa-check" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
				<div className="roww">
					{/* <div className="col-12 col-md-6 col-lg-6 col-xl-6">
						<div className="card">
							<div className="card-body">
								<div className="chart-title">
									<h4>Patient Total</h4>
									<span className="float-right"><i className="fa fa-caret-up" aria-hidden="true"></i> 15% Higher than Last Month</span>
								</div>	
								<canvas id="linegraph"></canvas>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 col-lg-6 col-xl-6">
						<div className="card">
							<div className="card-body">
						<h1>hello</h1>
								<canvas id="bargraph"></canvas>
							</div>
						</div>
					</div> */}
                    <h1>Appointment & <br /> Doctor Management</h1>
                    <p>This section is for managing appointments and doctors. You can view, add, edit, or delete appointment records and assign them to specific doctors and departments.</p>
                     <Link to="/appointments">
                    <button>Create Appointment</button>
                    </Link>
				</div>
				
            </div>
          
        </div>
        </div >
        <div className="sidebar-overlay" data-reff=""></div>
   </>
    )
}
export default Index;