import React, { useContext, useEffect, useReducer, useState } from "react";
// @ts-expect-error
import MainLayout from "../Layout";
import "./style/trackingPage.css";
import CustomizedSteppers from "./components/CustomizedSteppers";
import { ShipmentTrackingContext } from "../App";
import { TransitEventState } from "@/types";
import EventsTable from "./components/EventsTable";
import AddressCard from "./components/AddressCard";
import ReportProblem from "./components/ReportProblem";

const STEPS: {
  name:
    | TransitEventState.TICKET_CREATED
    | TransitEventState.PACKAGE_RECEIVED
    | TransitEventState.OUT_FOR_DELIVERY
    | TransitEventState.DELIVERED;
}[] = [
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
    console.log(context);
    if (context?.shipmentDetails) {
      let step = 0;
      for (let i = 0; i < context.shipmentDetails.TransitEvents.length; i++) {
        const currEvent = context.shipmentDetails.TransitEvents[i];
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
        <div className="shipment-data">
          <div className="each-shipment-data">
            <h5>Shipment number 2212121</h5>
            <h4
              style={{
                color:
                  context?.shipmentDetails?.CurrentStatus.state ===
                  TransitEventState.DELIVERED
                    ? "green"
                    : context?.shipmentDetails?.CurrentStatus.state ===
                      TransitEventState.NOT_YET_SHIPPED
                    ? "#ffb12b"
                    : "#f4050d",
              }}
            >
              Delivered
            </h4>
          </div>

          <div className="each-shipment-data">
            <h5>Last updated</h5>
            <h4>21-10-2023</h4>
          </div>

          <div className="each-shipment-data">
            <h5>Seller Name</h5>
            <h4>SOUQ.COM</h4>
          </div>

          <div className="each-shipment-data">
            <h5>Promised Date</h5>
            <h4>21-10-2023</h4>
          </div>
        </div>

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
            currentStatus={context?.shipmentDetails?.CurrentStatus}
          />
        </div>
      </div>
      <div className="table-and-address-container">
        <EventsTable transitEvents={context?.shipmentDetails?.TransitEvents} />
        <div className="address-and-report-container">
          <AddressCard />
          <ReportProblem />
        </div>
      </div>
    </MainLayout>
  );
};

export default TrackingPage;
