import { ShipmentTrackingContext } from "@/App";
import React, { useContext } from "react";

export default function ReportProblem() {
  const context = useContext(ShipmentTrackingContext);
  return (
    <div className="report-container">
      <strong>Do you have a problem in your shipment?!</strong>
      <a
        href={`tel:${+context?.shipmentDetails?.SupportPhoneNumbers[0]}`}
        className="report-button"
      >
        Report a problem
      </a>
    </div>
  );
}
