import { ShipmentTrackingContext } from "@/App";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export default function ReportProblem() {
  const { t } = useTranslation();
  const context = useContext(ShipmentTrackingContext);

  return (
    <div className="report-container">
      <strong>{t("report-problem-question")}</strong>
      <a href={`tel:${+(context?.shipmentDetails?.SupportPhoneNumbers?.[0] ?? "111")}`} className="report-button">
        {t("report-problem-button")}
      </a>
    </div>
  );
}
