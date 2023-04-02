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
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const STEPS: {
  name: TransitEventState.TICKET_CREATED | TransitEventState.PACKAGE_RECEIVED | TransitEventState.OUT_FOR_DELIVERY | TransitEventState.DELIVERED;
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

  const { i18n } = useTranslation();

  const routeParams = useParams<{
    lang: "ar" | "en";
  }>();

  useEffect(() => {
    console.log(routeParams);
    if (routeParams.lang && !["en", "ar"].includes(routeParams.lang)) {
      window.location.replace("/en");
    } else {
      i18n.changeLanguage(routeParams.lang);
      document.documentElement.lang = i18n.language;
      document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    }
  }, []);
  useEffect(() => {
    if (context?.shipmentDetails) {
      let step = 0;
      for (const element of context.shipmentDetails.TransitEvents) {
        const currEvent = element;
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
          <CustomizedSteppers steps={STEPS} activeStep={currentStep} currentStatus={context?.shipmentDetails?.CurrentStatus} />
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
