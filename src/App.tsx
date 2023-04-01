import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
// @ts-expect-error
import TrackingPage from "@/pages/TrackingPage";
import "./style/main.css";
import { createContext, useEffect, useState } from "react";
import { ShipmentTracking } from "@/types";
import axios from "axios";
import React from "react";

export const ShipmentTrackingContext = createContext<ShipmentTracking | null>(null);

const SHIPMENT_ID = 7234258;

interface ShipmentAPIResponse {
  data: ShipmentTracking;
}

function App() {
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentTracking | null>(null);
  async function fetchShipmentTrackingInfo() {
    try {
      const res = await axios.get<ShipmentAPIResponse>(`https://tracking.bosta.co/shipments/track/${SHIPMENT_ID}`);
      console.log(res.data.data);
      setShipmentDetails(res.data.data);
    } catch (err) {
      console.error(err);
      setShipmentDetails(null);
    }
  }

  useEffect(() => {
    fetchShipmentTrackingInfo();
  }, []);

  return (
    <ShipmentTrackingContext.Provider value={shipmentDetails}>
      <Routes>
        <Route path="/" element={<TrackingPage />} />
      </Routes>
    </ShipmentTrackingContext.Provider>
  );
}

export default App;
