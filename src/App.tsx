import "./App.css";
import { Route, Routes, Navigate, useParams, useSearchParams } from "react-router-dom";
import "./style/main.css";
import { createContext, lazy, useEffect, useState } from "react";
import { ShipmentTracking } from "@/types";
import axios from "axios";
import React from "react";
import { useTranslation } from "react-i18next";

type ContextType = {
  shipmentDetails: ShipmentTracking | null;
  setShipmentDetails: React.Dispatch<React.SetStateAction<ShipmentTracking | null>>;
  setShipmentId: React.Dispatch<React.SetStateAction<number | null>>;
  error: boolean;
};

const TrackingPage = lazy(async () => await import("./pages/TrackingPage"));

export const ShipmentTrackingContext = createContext<ContextType | null>(null);

const SHIPMENT_ID = 7234258;

function App() {
  let [searchParams, setSearchParams] = useSearchParams();

  const [shipmentDetails, setShipmentDetails] = useState<ShipmentTracking | null>(null);

  const [error, setError] = useState<boolean>(false);
  // const [shipmentId, setShipmentId] = useState<number | null>(null);
  const [shipmentId, setShipmentId] = useState<number | null>(searchParams.get("id") ?? null);
  async function fetchShipmentTrackingInfo() {
    try {
      const res = await axios.get<ShipmentTracking>(`https://tracking.bosta.co/shipments/track/${shipmentId}`);
      setShipmentDetails(res.data);
      setError(false);
    } catch (err) {
      console.error(err);
      setShipmentDetails(null);
      setError(true);
    }
  }

  const { i18n } = useTranslation();

  const routeParams = useParams<{
    lang: "ar" | "en";
  }>();

  useEffect(() => {
    console.log("QUERIES ARE", searchParams.get("id"));
    if (routeParams.lang && !["en", "ar"].includes(routeParams.lang)) {
      window.location.replace("/en");
    } else {
      i18n.changeLanguage(routeParams.lang);
      document.documentElement.lang = i18n.language;
      document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    }
  }, []);

  useEffect(() => {
    if (shipmentId) {
      fetchShipmentTrackingInfo();
    }
  }, [shipmentId]);

  return (
    <ShipmentTrackingContext.Provider value={{ shipmentDetails, setShipmentDetails, setShipmentId, error }}>
      <TrackingPage />
    </ShipmentTrackingContext.Provider>
  );
}

export default App;
