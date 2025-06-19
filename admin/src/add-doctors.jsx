
import Header from "./header.jsx"
import SideBar from "./sideBar.jsx"
import MainAddDoctor from "./mainAddDoctor.jsx"
import React from "react";
//script
import "./js/jquery-3.2.1.min.js"

import "./js/jquery.slimscroll.js"
import "./js/select2.min.js"

 import "./js/app.js"
  
 

function AddDoctors() {

  return (
    <>
    <SideBar/> 
    <Header/>
    <MainAddDoctor/>


    
     	
    <script src="./js/moment.min.js"></script>
	<script src="/js/popper.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/moment.min.js"></script>
    <script src="/js/bootstrap-datetimepicker.min.js"></script>
   
    

   
    </>    
  )
}
export default AddDoctors;
