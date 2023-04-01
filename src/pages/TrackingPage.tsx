import React, { useContext, useEffect, useState } from "react";
import MainLayout from "../Layout";
import "./style/trackingPage.css";
import { Step, StepLabel, Stepper } from "@mui/material";
import CustomizedSteppers from "./components/CustomizedSteppers";
import { ShipmentTrackingContext } from "../App";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
  "Create an ay 7aga",
];

const TrackingPage = () => {
  const context = useContext(ShipmentTrackingContext);

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
          <CustomizedSteppers steps={steps} activeStep={1} />
        </div>
      </div>
    </MainLayout>
  );
};

export default TrackingPage;
