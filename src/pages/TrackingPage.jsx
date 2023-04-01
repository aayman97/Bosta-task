import React from "react";
import MainLayout from "../Layout";
import "./style/trackingPage.css";
import { Step, StepLabel, Stepper } from "@mui/material";
import CustomizedSteppers from "./components/CustomizedSteppers";

const TrackingPage = () => {
  return (
    <MainLayout>
      <div className="shippment-details-container">
        <div style={{ height: "50%" }} />

        <div className="tracking-trip-container">
          {/* <div className='tracking-meter'>
                <div className='tracking-meter-fill' style={{ width : "33%"}}>
              
                </div>
                {[...Array(4).keys()].map((item,index) =>{
                  return(
                    <div className='tracking-image-indicator' style={{left :`${index*(32.5)-0.2}%`}}>
                  
                    </div>
                  )
                }) 
                  }
               
            </div> */}
          <CustomizedSteppers />
        </div>
      </div>
    </MainLayout>
  );
};

export default TrackingPage;
