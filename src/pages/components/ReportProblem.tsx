import { useTranslation } from "react-i18next";

export default function ReportProblem() {
  const { t } = useTranslation();

  return (
    <div className="report-container">
      <strong>{t("report-problem-question")}</strong>
      <button className="report-button">{t("report-problem-button")}</button>
    </div>
  );
}
