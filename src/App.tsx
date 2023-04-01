import "./App.css";
import { Route, Routes } from "react-router-dom";
import "./style/main.css";
import { Suspense, createContext, lazy, useEffect, useState } from "react";
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

const TrackingPage = lazy(async () => await import("./pages/TrackingPage"));

export const ShipmentTrackingContext = createContext<ContextType | null>(null);

const SHIPMENT_ID = 7234258;

function App() {
  const [shipmentDetails, setShipmentDetails] =
    useState<ShipmentTracking | null>(null);
  // const [shipmentId, setShipmentId] = useState<number | null>(null);
  const [shipmentId, setShipmentId] = useState<number | null>(null);
  async function fetchShipmentTrackingInfo() {
    try {
      const res = await axios.get<ShipmentTracking>(
        `https://tracking.bosta.co/shipments/track/${shipmentId}`
      );
      setShipmentDetails(res.data);
    } catch (err) {
      console.error(err);
      setShipmentDetails(null);
    }
  }

  useEffect(() => {
    if (shipmentId) {
      fetchShipmentTrackingInfo();
    }
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
