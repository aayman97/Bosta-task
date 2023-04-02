import React, { useContext, useEffect, useReducer, useState } from "react";
// @ts-expect-error
import MainLayout from "../Layout";
import "./style/trackingPage.css";
import CustomizedSteppers from "./components/CustomizedSteppers";
import { ShipmentTrackingContext } from "../App";
import { EventState, TransitEventState } from "@/types";
import EventsTable from "./components/EventsTable";
import AddressCard from "./components/AddressCard";
import ReportProblem from "./components/ReportProblem";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

  const { t } = useTranslation();

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
      {context?.shipmentDetails ? (
        <>
          <div className="shippment-details-container">
            <div className="shipment-data">
              <div className="each-shipment-data">
                <h5>Shipment number {context?.shipmentDetails?.TrackingNumber}</h5>
                <h4
                  style={{
                    color:
                      context?.shipmentDetails?.CurrentStatus.state === TransitEventState.DELIVERED
                        ? "green"
                        : context?.shipmentDetails?.CurrentStatus.state === TransitEventState.NOT_YET_SHIPPED
                        ? "#ffb12b"
                        : "#f4050d",
                  }}
                >
                  {EventState[context?.shipmentDetails?.CurrentStatus.state]}
                </h4>
              </div>

              <div className="each-shipment-data">
                <h5>Last updated</h5>
                <h4>
                  {new Date(context?.shipmentDetails?.CurrentStatus.timestamp).toLocaleDateString()}{" "}
                  {weekday[new Date(context?.shipmentDetails?.CurrentStatus.timestamp).getDay()]}
                </h4>
              </div>

              <div className="each-shipment-data">
                <h5>Seller Name</h5>
                <h4>{context?.shipmentDetails?.provider}</h4>
              </div>

              <div className="each-shipment-data">
                <h5>Promised Date</h5>
                <h4>
                  {new Date(context?.shipmentDetails?.PromisedDate).toLocaleDateString()}{" "}
                  {weekday[new Date(context?.shipmentDetails?.PromisedDate).getDay()]}
                </h4>
              </div>
            </div>

            <div className="tracking-trip-container">
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
        </>
      ) : context?.error ? (
        <h1>
          {t("wrong-shipment-number")}
          <br />
          {t("please-enter-correct-one")}
        </h1>
      ) : (
        <h1>{t("enter-shipment-number")}</h1>
      )}
    </MainLayout>
  );
};

export default TrackingPage;
