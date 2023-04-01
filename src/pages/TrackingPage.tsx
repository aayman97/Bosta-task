import React, { useContext, useEffect, useReducer, useState } from "react";
// @ts-expect-error
import MainLayout from "../Layout";
import "./style/trackingPage.css";
import CustomizedSteppers from "./components/CustomizedSteppers";
import { ShipmentTrackingContext } from "../App";
import { TransitEventState } from "@/types";

const STEPS = [
  {
    name: TransitEventState.TICKET_CREATED,
  },
  {
    name: TransitEventState.PACKAGE_RECEIVED,
  },
  {
    name: TransitEventState.OUT_FOR_DELIVERY,
  },
  {
    name: TransitEventState.DELIVERED,
  },
];

const TrackingPage = () => {
  const context = useContext(ShipmentTrackingContext);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (context) {
      let step = 0;
      for (let i = 0; i < context.TransitEvents.length; i++) {
        const currEvent = context.TransitEvents[i];
        const currState = currEvent.state;

        switch (currState) {
          case TransitEventState.TICKET_CREATED:
            step = 0;
            break;
          case TransitEventState.PACKAGE_RECEIVED:
            step = 1;
            break;
          case TransitEventState.OUT_FOR_DELIVERY:
            step = 2;
            break;
          case TransitEventState.DELIVERED:
            step = 3;
            break;
        }
      }
      setCurrentStep(step);
    }
  }, [context]);

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
          <CustomizedSteppers
            steps={STEPS}
            activeStep={currentStep}
            currentStatus={context?.CurrentStatus}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default TrackingPage;
