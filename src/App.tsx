import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import TrackingPage from "@/pages/TrackingPage";
import "./style/main.css";
import { createContext, useEffect, useState } from "react";
import { ShipmentTracking } from "@/types";
import axios from "axios";
import React from "react";

type ContextType = {
  shipmentDetails: ShipmentTracking | null;
  setShipmentDetails: React.Dispatch<
    React.SetStateAction<ShipmentTracking | null>
  >;
  setShipmentId: React.Dispatch<React.SetStateAction<number | null>>;
};

export const ShipmentTrackingContext = createContext<ContextType | null>(null);

const SHIPMENT_ID = 7234258;

function App() {
  const [shipmentDetails, setShipmentDetails] =
    useState<ShipmentTracking | null>(null);
  // const [shipmentId, setShipmentId] = useState<number | null>(null);
  const [shipmentId, setShipmentId] = useState<number | null>(SHIPMENT_ID);
  async function fetchShipmentTrackingInfo() {
    try {
      const res = await axios.get<ShipmentTracking>(
        `https://tracking.bosta.co/shipments/track/${shipmentId}`
      );
      console.log("RES IS", res.data);
      setShipmentDetails(res.data);
    } catch (err) {
      console.error(err);
      setShipmentDetails(null);
    }
  }

  useEffect(() => {
    fetchShipmentTrackingInfo();
  }, [shipmentId]);

  return (
    <ShipmentTrackingContext.Provider
      value={{ shipmentDetails, setShipmentDetails, setShipmentId }}
    >
      <Routes>
        <Route path="/" element={<TrackingPage />} />
      </Routes>
    </ShipmentTrackingContext.Provider>
  );
}

export default App;
